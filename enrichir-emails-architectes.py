#!/usr/bin/env python3
"""
Enrichissement des emails d'architectes à partir du CSV de l'annuaire.

Stratégie :
1. Deviner le site web à partir du nom (patterns courants)
2. Scraper le site (accueil + page contact) pour trouver l'email
3. Fallback : DuckDuckGo (avec gros délai anti rate-limit)

Usage:
    python3 enrichir-emails-architectes.py --limit 100
    python3 enrichir-emails-architectes.py --resume
"""

import requests
from bs4 import BeautifulSoup
import csv
import json
import time
import argparse
import re
import os
import random
from urllib.parse import quote_plus, urljoin, unquote, urlparse

USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
]

HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
}

DELAY_SITE = 1
DELAY_SEARCH = 10  # DuckDuckGo (prudent)

# Patterns email à ignorer
EMAIL_BLACKLIST = [
    'noreply', 'no-reply', 'mailer-daemon', 'postmaster', 'webmaster',
    'example.com', 'example.org', 'sentry.io', 'wixpress.com', 'wix.com',
    'placeholder', 'email@', 'votre@', 'your@', 'test@', 'info@w3',
    'protection@', 'abuse@', 'privacy@', 'security@', 'support@cloudflare',
    'google.com', 'facebook.com', 'twitter.com', 'schema.org',
    'annuairefrancais', 'annuaire@', 'contact@cylex', 'info@kompass',
    'contact@archiliste', 'contact@keskeces', '@sentry', '@vercel',
    'wght@', 'ital@', 'font@', 'display@',
]

PROGRESS_FILE = 'enrichissement-progress.json'


def slugify(text):
    """Transforme un nom en slug pour URL."""
    text = text.lower().strip()
    # Remplacer les accents
    replacements = {
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'à': 'a', 'â': 'a', 'ä': 'a',
        'ù': 'u', 'û': 'u', 'ü': 'u',
        'ô': 'o', 'ö': 'o',
        'î': 'i', 'ï': 'i',
        'ç': 'c', "'": '', '&': '', '.': '',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    # Garder que alphanum et espaces -> tirets
    text = re.sub(r'[^a-z0-9\s]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    return text


def generate_site_urls(nom):
    """Génère des URLs probables pour le site d'un architecte."""
    slug = slugify(nom)
    parts = slug.split('-')

    urls = []

    # Pattern : nom complet
    urls.append(f'https://www.{slug}.fr')
    urls.append(f'https://{slug}.fr')
    urls.append(f'https://www.{slug}.com')

    # Si c'est "NOM PRENOM" -> essayer prenom-nom et nom-prenom
    if len(parts) >= 2:
        # Pour un nom d'architecte individuel (NOM PRENOM)
        nom_part = parts[0]
        prenom_part = parts[-1] if len(parts) == 2 else '-'.join(parts[1:])

        # prenom-nom
        urls.append(f'https://www.{prenom_part}-{nom_part}.fr')
        urls.append(f'https://{prenom_part}-{nom_part}.fr')

        # Juste le nom de famille
        if len(nom_part) > 3:
            urls.append(f'https://www.{nom_part}-architecte.fr')
            urls.append(f'https://www.{nom_part}-architecture.fr')
            urls.append(f'https://www.atelier-{nom_part}.fr')
            urls.append(f'https://www.agence-{nom_part}.fr')

    # Si c'est un nom de société/agence
    if any(kw in nom.lower() for kw in ['atelier', 'agence', 'studio', 'cabinet', 'bureau']):
        urls.append(f'https://www.{slug}.fr')
        urls.append(f'https://www.{slug}.com')

    # Variantes sans www
    extra = []
    for u in urls:
        if 'www.' in u:
            extra.append(u.replace('www.', ''))
    urls.extend(extra)

    # Dédupliquer
    seen = set()
    unique = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            unique.append(u)

    return unique


class EmailEnricher:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.session.headers['User-Agent'] = random.choice(USER_AGENTS)
        self.found = 0
        self.searched = 0
        self.ddg_fails = 0

    def find_email(self, nom, ville='', code_postal=''):
        """Cherche l'email d'un architecte."""
        self.searched += 1
        nom_clean = nom.strip()
        if not nom_clean:
            return '', ''

        # Étape 1 : Deviner et tester des URLs de site web
        site_url, email = self._try_guessed_urls(nom_clean)
        if email:
            self.found += 1
            return email, site_url

        # Étape 2 : DuckDuckGo (si pas rate-limité)
        if self.ddg_fails < 3:
            time.sleep(DELAY_SEARCH + random.uniform(2, 6))
            ddg_site, ddg_email = self._search_duckduckgo(nom_clean, ville)
            if ddg_email:
                self.found += 1
                return ddg_email, ddg_site or site_url
            if ddg_site and not site_url:
                site_url = ddg_site

        return '', site_url

    def _try_guessed_urls(self, nom):
        """Essaie de deviner le site web et scraper l'email."""
        urls = generate_site_urls(nom)

        for url in urls[:8]:  # Tester max 8 URLs
            try:
                resp = self.session.get(url, timeout=5, allow_redirects=True)
                if resp.status_code == 200 and len(resp.text) > 1000:
                    # Site trouvé ! Chercher l'email
                    email = self._extract_email_from_site(resp.text, resp.url)
                    if email:
                        return resp.url, email
                    # Pas d'email sur l'accueil, tenter la page contact
                    email = self._try_contact_page(resp.text, resp.url)
                    if email:
                        return resp.url, email
                    # Site trouvé mais pas d'email
                    return resp.url, ''
            except (requests.ConnectionError, requests.Timeout):
                continue
            except Exception:
                continue

        return '', ''

    def _extract_email_from_site(self, html, base_url):
        """Extrait l'email d'une page HTML."""
        emails = set()

        # Mailto
        soup = BeautifulSoup(html, 'html.parser')
        for a in soup.select('[href^="mailto:"]'):
            email = a.get('href', '').replace('mailto:', '').split('?')[0].strip()
            if self._is_valid_email(email):
                emails.add(email.lower())

        # Regex
        found = re.findall(r'[\w\.\-\+]+@[\w\.\-]+\.\w{2,6}', html)
        for email in found:
            if self._is_valid_email(email):
                emails.add(email.lower())

        if emails:
            return self._pick_best(emails)
        return ''

    def _try_contact_page(self, html, base_url):
        """Cherche et visite la page contact."""
        soup = BeautifulSoup(html, 'html.parser')
        keywords = ['contact', 'nous-contacter', 'nous-ecrire', 'a-propos', 'agence', 'equipe', 'about']

        for a in soup.select('a[href]'):
            href = (a.get('href', '') or '').lower()
            text = (a.get_text(strip=True) or '').lower()
            if any(kw in href or kw in text for kw in keywords):
                contact_url = urljoin(base_url, a.get('href', ''))
                if contact_url == base_url:
                    continue
                try:
                    time.sleep(0.5)
                    resp = self.session.get(contact_url, timeout=5)
                    if resp.status_code == 200:
                        email = self._extract_email_from_site(resp.text, contact_url)
                        if email:
                            return email
                except Exception:
                    pass
                break
        return ''

    def _search_duckduckgo(self, nom, ville=''):
        """Recherche via DuckDuckGo (fallback)."""
        self.session.headers['User-Agent'] = random.choice(USER_AGENTS)
        query = f'{nom} architecte {ville} contact email'
        url = f'https://html.duckduckgo.com/html/?q={quote_plus(query)}'

        try:
            resp = self.session.get(url, timeout=15)
            if resp.status_code in (429, 202) or resp.status_code >= 500:
                self.ddg_fails += 1
                return '', ''
            if resp.status_code != 200:
                return '', ''

            self.ddg_fails = 0  # Reset on success

            soup = BeautifulSoup(resp.text, 'html.parser')
            skip = ['pagesjaunes', 'societe.com', 'linkedin', 'facebook',
                     'architectes.org', 'google', 'bing', 'youtube', 'twitter',
                     'wikipedia', 'pinterest', 'duckduckgo', 'instagram']

            for a in soup.select('.result__a'):
                href = a.get('href', '')
                if 'uddg=' not in href:
                    continue
                real = unquote(href.split('uddg=')[1].split('&')[0])
                if any(s in real.lower() for s in skip):
                    continue

                # Visiter ce site
                time.sleep(DELAY_SITE)
                try:
                    r = self.session.get(real, timeout=8)
                    if r.status_code == 200:
                        email = self._extract_email_from_site(r.text, r.url)
                        if email:
                            return real, email
                        email = self._try_contact_page(r.text, r.url)
                        if email:
                            return real, email
                        return real, ''  # Site trouvé, pas d'email
                except Exception:
                    continue

            return '', ''

        except (requests.ConnectionError, requests.Timeout):
            self.ddg_fails += 1
            return '', ''
        except Exception:
            self.ddg_fails += 1
            return '', ''

    def _is_valid_email(self, email):
        if not email or '@' not in email:
            return False
        email = email.lower().strip()
        if not re.match(r'^[\w\.\-\+]+@[\w\.\-]+\.\w{2,6}$', email):
            return False
        for bl in EMAIL_BLACKLIST:
            if bl in email:
                return False
        if email.endswith(('.png', '.jpg', '.gif', '.css', '.js', '.svg', '.webp')):
            return False
        return True

    def _pick_best(self, emails):
        if not emails:
            return ''
        if len(emails) == 1:
            return list(emails)[0]
        # Préférer domaine pro
        for e in emails:
            domain = e.split('@')[1]
            if not any(g in domain for g in ['gmail', 'yahoo', 'hotmail', 'outlook', 'orange', 'free', 'sfr', 'laposte']):
                return e
        return list(emails)[0]


def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return {'last_index': 0, 'results': {}}


def save_progress(index, results):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump({'last_index': index, 'results': results}, f, ensure_ascii=False)


def main():
    parser = argparse.ArgumentParser(description="Enrichir les emails des architectes")
    parser.add_argument('--input', '-i', default='architectes-annuaire.csv', help='CSV source')
    parser.add_argument('--output', '-o', default='architectes-avec-emails.csv', help='CSV sortie')
    parser.add_argument('--limit', '-l', type=int, default=0, help='Limiter à N architectes')
    parser.add_argument('--resume', action='store_true', help='Reprendre')
    parser.add_argument('--only-with-tel', action='store_true', help='Seulement ceux avec tel')

    args = parser.parse_args()

    print("=" * 60)
    print("  ENRICHISSEMENT EMAILS ARCHITECTES")
    print("  1. Deviner le site web  2. Scraper contact  3. DuckDuckGo")
    print("=" * 60)

    if not os.path.exists(args.input):
        print(f"\nFichier {args.input} introuvable!")
        return

    with open(args.input, 'r', encoding='utf-8') as f:
        architects = list(csv.DictReader(f))

    print(f"\n{len(architects)} architectes chargés")

    start_index = 0
    results = {}
    if args.resume:
        progress = load_progress()
        start_index = progress['last_index']
        results = progress['results']
        total_emails = sum(1 for v in results.values() if v.get('email'))
        print(f"Reprise index {start_index} ({total_emails} emails déjà trouvés)")

    enricher = EmailEnricher()
    limit = args.limit if args.limit > 0 else len(architects)
    count = 0
    last_i = start_index

    print(f"\nRecherche en cours (Ctrl+C pour pause)...\n")

    try:
        for i, arch in enumerate(architects):
            if i < start_index:
                continue
            if count >= limit:
                break

            last_i = i

            nom = arch.get('nom', '').strip()
            if not nom:
                continue

            matricule = arch.get('matricule', str(i))
            if matricule in results:
                continue

            if args.only_with_tel and not arch.get('telephone', '').strip():
                continue

            ville = arch.get('ville', '')
            cp = arch.get('code_postal', '')

            print(f"  [{count+1}/{limit}] {nom[:35]:35s} ({ville or cp:15s})", end="", flush=True)

            email, site_url = enricher.find_email(nom, ville=ville, code_postal=cp)
            results[matricule] = {'email': email, 'site_web': site_url}

            if email:
                print(f" -> {email}")
            elif site_url:
                print(f" -> site trouvé (pas d'email)")
            else:
                print(f" -> -")

            count += 1
            if count % 5 == 0:
                save_progress(i + 1, results)

            time.sleep(DELAY_SITE + random.uniform(0, 1))

    except KeyboardInterrupt:
        print("\n\nPause!")

    save_progress(last_i + 1, results)

    # Écrire CSV enrichi
    fieldnames = list(architects[0].keys()) if architects else []
    if 'email' not in fieldnames:
        fieldnames.append('email')
    if 'site_web' not in fieldnames:
        fieldnames.append('site_web')

    for arch in architects:
        m = arch.get('matricule', '')
        if m in results:
            if results[m].get('email'):
                arch['email'] = results[m]['email']
            if results[m].get('site_web'):
                arch['site_web'] = results[m]['site_web']

    with open(args.output, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
        writer.writeheader()
        writer.writerows(architects)

    total_emails = sum(1 for v in results.values() if v.get('email'))
    total_sites = sum(1 for v in results.values() if v.get('site_web'))

    print(f"\n{'=' * 60}")
    print(f"  RÉSULTAT")
    print(f"{'=' * 60}")
    print(f"  Traités  : {count}")
    print(f"  Emails   : {total_emails} ({total_emails*100//max(count,1)}%)")
    print(f"  Sites web: {total_sites}")
    print(f"  Sortie   : {args.output}")
    print(f"\n  Reprendre : python3 enrichir-emails-architectes.py --resume")


if __name__ == '__main__':
    main()
