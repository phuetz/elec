#!/usr/bin/env python3
"""
Enrichissement des emails d'architectes à partir du CSV de l'annuaire.
Cherche les emails via DuckDuckGo -> site web de l'architecte -> page contact.

Usage:
    python enrichir-emails-architectes.py
    python enrichir-emails-architectes.py --input architectes-annuaire.csv --limit 50
    python enrichir-emails-architectes.py --resume  # Reprend là où on s'est arrêté
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
from datetime import datetime
from urllib.parse import quote_plus, urljoin, unquote, urlparse

USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
]

HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
}

DELAY_SEARCH = 8  # Entre recherches DuckDuckGo (plus prudent)
DELAY_SITE = 1.5  # Entre visites de sites

# Domaines à ignorer dans les résultats de recherche
SKIP_DOMAINS = [
    'pagesjaunes', 'societe.com', 'linkedin', 'facebook', 'architectes.org',
    'architectes-pour-tous', 'larchitecte.net', 'batiment.e-pro', 'google',
    'bing', 'kompass', 'malt.fr', 'youtube', 'twitter', 'instagram',
    'wikipedia', 'pinterest', 'duckduckgo',
]

# Patterns email à ignorer
EMAIL_BLACKLIST = [
    'noreply', 'no-reply', 'mailer-daemon', 'postmaster', 'webmaster',
    'example.com', 'example.org', 'sentry.io', 'wixpress.com', 'wix.com',
    'placeholder', 'email@', 'votre@', 'your@', 'test@', 'info@w3',
    'protection@', 'abuse@', 'privacy@', 'security@', 'support@cloudflare',
    'google.com', 'facebook.com', 'twitter.com', 'schema.org',
    'annuairefrancais', 'annuaire@', 'contact@cylex', 'info@kompass',
    'contact@archiliste', 'contact@keskeces',
]

PROGRESS_FILE = 'enrichissement-progress.json'


class EmailEnricher:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.found = 0
        self.searched = 0
        self.errors = 0

    def _rotate_ua(self):
        """Change le User-Agent aléatoirement."""
        self.session.headers['User-Agent'] = random.choice(USER_AGENTS)

    def find_email(self, nom, ville='', code_postal=''):
        """Cherche l'email d'un architecte."""
        self.searched += 1
        nom_clean = nom.strip()
        if not nom_clean:
            return '', ''

        # Étape 1 : Trouver le site web via DuckDuckGo
        site_url, email = self._search_duckduckgo(nom_clean, ville)

        if email:
            self.found += 1
            return email, site_url

        # Étape 2 : Chercher email + @ dans DuckDuckGo
        if not email:
            time.sleep(DELAY_SEARCH)
            email = self._search_duckduckgo_email(nom_clean, ville)

        if email:
            self.found += 1
            return email, site_url

        # Étape 3 : Annuaires secondaires (keskeces, archiliste, etc.)
        if site_url and not email:
            time.sleep(DELAY_SITE)
            email = self._scrape_annuaire_page(site_url)

        if email:
            self.found += 1
            return email, site_url

        return '', site_url

    def _search_duckduckgo(self, nom, ville=''):
        """Recherche le site web via DuckDuckGo, puis scrape pour email."""
        self._rotate_ua()
        query = f'{nom} architecte {ville} site officiel'
        url = f'https://html.duckduckgo.com/html/?q={quote_plus(query)}'

        try:
            resp = self.session.get(url, timeout=10)
            if resp.status_code == 202 or resp.status_code == 429:
                # Rate limited - attendre et réessayer une fois
                print(" [pause DDG]", end="", flush=True)
                time.sleep(30 + random.uniform(5, 15))
                self._rotate_ua()
                resp = self.session.get(url, timeout=10)
            if resp.status_code != 200:
                return '', ''

            soup = BeautifulSoup(resp.text, 'html.parser')

            # Extraire les URLs (sites propres d'abord, puis annuaires)
            own_sites = []
            annuaire_sites = []

            for a in soup.select('.result__a'):
                href = a.get('href', '')
                if 'uddg=' not in href:
                    continue
                real = unquote(href.split('uddg=')[1].split('&')[0])

                if any(s in real.lower() for s in SKIP_DOMAINS):
                    continue

                # Sites d'annuaires spécialisés (utiles pour récupérer l'email)
                if any(s in real.lower() for s in ['keskeces', 'archiliste', 'cylex', 'infobel', 'pss-archi']):
                    annuaire_sites.append(real)
                else:
                    own_sites.append(real)

            # Visiter les sites propres d'abord
            for site in own_sites[:3]:
                time.sleep(DELAY_SITE)
                email = self._scrape_site_for_email(site)
                if email:
                    return site, email

            # Puis les annuaires
            for site in annuaire_sites[:2]:
                time.sleep(DELAY_SITE)
                email = self._scrape_annuaire_page(site)
                if email:
                    return own_sites[0] if own_sites else site, email

            return own_sites[0] if own_sites else '', ''

        except Exception:
            self.errors += 1
            return '', ''

    def _search_duckduckgo_email(self, nom, ville=''):
        """Cherche directement l'email dans les snippets DuckDuckGo."""
        self._rotate_ua()
        query = f'"{nom}" architecte {ville} @ email contact'
        url = f'https://html.duckduckgo.com/html/?q={quote_plus(query)}'

        try:
            resp = self.session.get(url, timeout=10)
            if resp.status_code != 200:
                return ''

            # Chercher des emails dans les snippets
            emails = self._extract_emails(resp.text)
            return self._best_email(emails, nom)

        except Exception:
            return ''

    def _scrape_site_for_email(self, url):
        """Visite un site et cherche l'email (accueil puis page contact)."""
        try:
            parsed = urlparse(url)
            if not parsed.scheme:
                url = 'https://' + url

            resp = self.session.get(url, timeout=8, allow_redirects=True)
            if resp.status_code != 200:
                return ''

            # Chercher dans la page d'accueil
            emails = self._extract_emails(resp.text)
            if emails:
                return list(emails)[0]

            # Chercher une page contact
            soup = BeautifulSoup(resp.text, 'html.parser')
            contact_keywords = ['contact', 'nous-contacter', 'a-propos', 'about', 'agence', 'equipe', 'team']

            for a in soup.select('a[href]'):
                href = (a.get('href', '') or '').lower()
                if any(kw in href for kw in contact_keywords):
                    contact_url = urljoin(url, a.get('href', ''))
                    if contact_url == url:
                        continue
                    try:
                        time.sleep(0.5)
                        resp2 = self.session.get(contact_url, timeout=8)
                        emails = self._extract_emails(resp2.text)
                        if emails:
                            return list(emails)[0]
                    except Exception:
                        pass
                    break  # Ne tester qu'une seule page contact

            return ''

        except Exception:
            return ''

    def _scrape_annuaire_page(self, url):
        """Scrape une page d'annuaire pour trouver un email."""
        try:
            resp = self.session.get(url, timeout=8)
            if resp.status_code != 200:
                return ''
            emails = self._extract_emails(resp.text)
            return list(emails)[0] if emails else ''
        except Exception:
            return ''

    def _extract_emails(self, html_text):
        """Extrait les emails valides d'un texte HTML."""
        emails = set()

        # Regex dans le texte brut
        found = re.findall(r'[\w\.\-\+]+@[\w\.\-]+\.\w{2,}', html_text)
        for email in found:
            if self._is_valid_email(email):
                emails.add(email.lower())

        # Mailto links
        soup = BeautifulSoup(html_text, 'html.parser')
        for a in soup.select('[href^="mailto:"]'):
            email = a.get('href', '').replace('mailto:', '').split('?')[0]
            if self._is_valid_email(email):
                emails.add(email.lower())

        return emails

    def _is_valid_email(self, email):
        """Vérifie qu'un email est valide."""
        if not email or '@' not in email:
            return False

        email = email.lower().strip()

        if not re.match(r'^[\w\.\-\+]+@[\w\.\-]+\.\w{2,6}$', email):
            return False

        for bl in EMAIL_BLACKLIST:
            if bl in email:
                return False

        # Ignorer extensions de fichiers
        if email.endswith(('.png', '.jpg', '.gif', '.css', '.js', '.svg', '.min', '.webp')):
            return False

        return True

    def _best_email(self, emails, nom):
        """Choisit le meilleur email."""
        if not emails:
            return ''
        if len(emails) == 1:
            return list(emails)[0]

        # Préférer les emails contenant le nom
        nom_parts = [p.lower() for p in nom.split() if len(p) > 2]
        for email in emails:
            for part in nom_parts:
                if part in email:
                    return email

        # Préférer domaine pro
        for email in emails:
            domain = email.split('@')[1]
            if not any(g in domain for g in ['gmail', 'yahoo', 'hotmail', 'outlook', 'orange', 'free', 'sfr', 'laposte']):
                return email

        return list(emails)[0]


def load_progress():
    """Charge la progression."""
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return {'last_index': 0, 'results': {}}


def save_progress(index, results):
    """Sauvegarde la progression."""
    with open(PROGRESS_FILE, 'w') as f:
        json.dump({'last_index': index, 'results': results}, f, ensure_ascii=False)


def main():
    parser = argparse.ArgumentParser(description="Enrichir les emails des architectes")
    parser.add_argument('--input', '-i', default='architectes-annuaire.csv', help='CSV source')
    parser.add_argument('--output', '-o', default='architectes-avec-emails.csv', help='CSV sortie')
    parser.add_argument('--limit', '-l', type=int, default=0, help='Limiter à N architectes')
    parser.add_argument('--resume', action='store_true', help='Reprendre depuis la progression')
    parser.add_argument('--only-with-tel', action='store_true', help='Traiter uniquement ceux avec téléphone')

    args = parser.parse_args()

    print("=" * 60)
    print("  ENRICHISSEMENT EMAILS ARCHITECTES")
    print("  DuckDuckGo -> Site web -> Page contact")
    print("=" * 60)

    if not os.path.exists(args.input):
        print(f"\nFichier {args.input} introuvable!")
        return

    with open(args.input, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        architects = list(reader)

    print(f"\n{len(architects)} architectes chargés")

    # Progression
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

    print(f"\nRecherche en cours (Ctrl+C pour pause)...\n")

    try:
        for i, arch in enumerate(architects):
            if i < start_index:
                continue
            if count >= limit:
                break

            nom = arch.get('nom', '').strip()
            if not nom:
                continue

            matricule = arch.get('matricule', str(i))

            # Déjà traité ?
            if matricule in results:
                continue

            # Filtrer si demandé
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
                print(f" -> site: {site_url[:40]}... (pas d'email)")
            else:
                print(f" -> rien trouvé")

            count += 1

            # Sauvegarder tous les 5
            if count % 5 == 0:
                save_progress(i + 1, results)

            # Jitter aléatoire pour éviter le rate limiting
            time.sleep(DELAY_SEARCH + random.uniform(1, 4))

    except KeyboardInterrupt:
        print("\n\nPause! Sauvegarde...")

    # Sauvegarder la progression
    save_progress(i + 1 if 'i' in dir() else start_index, results)

    # Écrire le CSV enrichi
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

    # Stats
    total_emails = sum(1 for v in results.values() if v.get('email'))
    total_sites = sum(1 for v in results.values() if v.get('site_web'))

    print(f"\n{'=' * 60}")
    print(f"  RÉSULTAT")
    print(f"{'=' * 60}")
    print(f"  Architectes traités : {count}")
    print(f"  Emails trouvés      : {total_emails} ({total_emails*100//max(count,1)}%)")
    print(f"  Sites web trouvés   : {total_sites}")
    print(f"  Erreurs             : {enricher.errors}")
    print(f"  Fichier de sortie   : {args.output}")
    print(f"\n  Reprendre : python3 enrichir-emails-architectes.py --resume")
    print(f"  Voir les emails : grep -v ',,,' {args.output} | head -20")


if __name__ == '__main__':
    main()
