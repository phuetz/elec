#!/usr/bin/env python3
"""
Scraper de l'annuaire officiel des architectes (annuaire.architectes.org).
Extrait nom, adresse, téléphone, fax, région pour chaque architecte.

Note : l'email n'est pas accessible directement (protégé par captcha).

Usage:
    python scraper-annuaire-architectes.py --cp 93 --region 110
    python scraper-annuaire-architectes.py --cp 75011
    python scraper-annuaire-architectes.py --ville "Épinay-sur-Seine" --region 110
    python scraper-annuaire-architectes.py --region 110  # Toute l'IDF
"""

import requests
from bs4 import BeautifulSoup
import csv
import json
import time
import argparse
import re
from datetime import datetime

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'fr-FR,fr;q=0.9',
    'Referer': 'https://annuaire.architectes.org/',
    'X-Requested-With': 'XMLHttpRequest',
}

DELAY = 1.5  # Délai entre requêtes (respectueux)

REGIONS = {
    '101': 'Auvergne-Rhône-Alpes',
    '102': 'Bourgogne-Franche-Comté',
    '103': 'Bretagne',
    '104': 'Centre-Val de Loire',
    '105': 'Corse',
    '106': 'Grand Est',
    '109': 'Hauts-de-France',
    '110': 'Île-de-France',
    '112': 'Normandie',
    '113': 'Nouvelle-Aquitaine',
    '114': 'Occitanie',
    '115': 'Pays-de-la-Loire',
    '116': "Provence-Alpes-Côte d'Azur",
}

# Codes postaux IDF par département
CP_IDF = {
    '75': ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008',
           '75009', '75010', '75011', '75012', '75013', '75014', '75015', '75016',
           '75017', '75018', '75019', '75020'],
    '92': ['92000', '92100', '92110', '92120', '92130', '92140', '92150', '92160',
           '92170', '92190', '92200', '92210', '92220', '92230', '92240', '92250',
           '92260', '92270', '92300', '92310', '92320', '92330', '92340', '92350',
           '92360', '92370', '92380', '92390', '92400', '92410', '92420', '92430',
           '92500', '92600', '92700', '92800'],
    '93': ['93100', '93110', '93120', '93130', '93140', '93150', '93160', '93170',
           '93190', '93200', '93210', '93220', '93230', '93240', '93250', '93260',
           '93270', '93290', '93300', '93310', '93320', '93330', '93340', '93350',
           '93360', '93370', '93380', '93390', '93400', '93410', '93420', '93430',
           '93440', '93450', '93460', '93470', '93500', '93600', '93700', '93800'],
    '94': ['94000', '94100', '94110', '94120', '94130', '94140', '94150', '94160',
           '94170', '94190', '94200', '94210', '94220', '94230', '94240', '94250',
           '94260', '94270', '94290', '94300', '94310', '94320', '94340', '94350',
           '94360', '94370', '94380', '94400', '94410', '94420', '94430', '94440',
           '94450', '94460', '94470', '94480', '94500', '94510', '94520', '94550',
           '94600', '94700', '94800'],
    '95': ['95000', '95100', '95110', '95120', '95130', '95140', '95150', '95160',
           '95170', '95190', '95200', '95210', '95220', '95230', '95240', '95250',
           '95260', '95270', '95280', '95290', '95300', '95310', '95320', '95330',
           '95340', '95350', '95360', '95370', '95380', '95390', '95400', '95410',
           '95420', '95430', '95440', '95450', '95460', '95470', '95480', '95490',
           '95500', '95520', '95540', '95550', '95560', '95570', '95580', '95590',
           '95600', '95610', '95620', '95630', '95640', '95650', '95660', '95670',
           '95680', '95690', '95700', '95750', '95800', '95810', '95820', '95830',
           '95840', '95850', '95860', '95870', '95880'],
}


class AnnuaireArchitectesScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.results = []

    def search(self, cp='', ville='', region='110', nom='', me='0'):
        """Recherche d'architectes sur l'annuaire officiel."""
        data = {
            'type': 'habilite',
            'posted': '1',
            'me': me,
            'nom': nom,
            'prenom': '',
            'cp': cp,
            'ville': ville,
            'code_region': region,
        }

        region_name = REGIONS.get(region, region)
        search_label = f"CP={cp}" if cp else f"ville={ville}" if ville else f"région={region_name}"
        print(f"  Recherche: {search_label}...", end=" ", flush=True)

        try:
            resp = self.session.post('https://annuaire.architectes.org/', data=data, timeout=15)
            if resp.status_code != 200:
                print(f"Erreur {resp.status_code}")
                return []

            soup = BeautifulSoup(resp.text, 'html.parser')
            rows = soup.select('.resultats .row')

            if not rows:
                print("0 résultats")
                return []

            print(f"{len(rows)} résultats", end="", flush=True)

            # Pour chaque architecte, récupérer les détails
            count = 0
            for row in rows:
                summary = row.select_one('.summary')
                if not summary:
                    continue

                rel = summary.get('rel', '')
                if not rel:
                    continue

                nom_el = summary.select_one('.nom')
                id_el = summary.select_one('.id')

                architect = {
                    'matricule': id_el.get_text(strip=True) if id_el else '',
                    'nom': nom_el.get_text(strip=True) if nom_el else '',
                    'adresse': '',
                    'code_postal': '',
                    'ville': '',
                    'telephone': '',
                    'fax': '',
                    'region': region_name,
                    'type': '',
                    'date_inscription': '',
                    'diplome': '',
                    'url_fiche': f'https://annuaire.architectes.org{rel}',
                    'recherche': search_label,
                    'date_extraction': datetime.now().strftime('%Y-%m-%d'),
                }

                # Récupérer les détails via AJAX
                details = self._get_details(rel)
                if details:
                    architect.update(details)

                self.results.append(architect)
                count += 1
                time.sleep(DELAY)

            print(f" -> {count} fiches extraites")
            return self.results

        except Exception as e:
            print(f"Erreur: {e}")
            return []

    def _get_details(self, rel_url):
        """Récupère les détails d'un architecte via AJAX."""
        try:
            url = f'https://annuaire.architectes.org{rel_url}'
            resp = self.session.get(url, timeout=15)
            if resp.status_code != 200:
                return {}

            soup = BeautifulSoup(resp.text, 'html.parser')
            details = {}

            # Adresse
            addr_el = soup.select_one('.elt.adresse .value')
            if addr_el:
                addr_text = addr_el.get_text(separator=' ', strip=True)
                details['adresse'] = addr_text
                # Extraire CP et ville
                cp_match = re.search(r'(\d{5})\s+(.+?)(?:\s+FRANCE)?$', addr_text)
                if cp_match:
                    details['code_postal'] = cp_match.group(1)
                    details['ville'] = cp_match.group(2).strip()

            # Téléphone
            tel_el = soup.select_one('.elt.telephone .value')
            if tel_el:
                # Vérifier si c'est le téléphone ou le fax
                label = soup.select_one('.elt.telephone .libelle')
                tel_text = tel_el.get_text(strip=True)
                if label and 'fax' in label.get_text(strip=True).lower():
                    details['fax'] = tel_text
                else:
                    details['telephone'] = tel_text

            # Gérer plusieurs blocs téléphone (tel + fax)
            tel_elts = soup.select('.elt.telephone')
            for elt in tel_elts:
                label = elt.select_one('.libelle')
                value = elt.select_one('.value')
                if label and value:
                    label_text = label.get_text(strip=True).lower()
                    val_text = value.get_text(strip=True)
                    if 'fax' in label_text:
                        details['fax'] = val_text
                    elif 'phone' in label_text or 'tél' in label_text:
                        details['telephone'] = val_text
                    elif not details.get('telephone'):
                        details['telephone'] = val_text

            # Type d'exercice
            depuis_el = soup.select_one('.elt.depuis .libelle')
            if depuis_el:
                details['type'] = depuis_el.get_text(strip=True)

            # Date inscription
            date_el = soup.select_one('.elt.date-inscription .value')
            if date_el:
                details['date_inscription'] = date_el.get_text(strip=True)

            # Diplôme
            diplome_el = soup.select_one('.elt.diplome .value')
            if diplome_el:
                details['diplome'] = diplome_el.get_text(strip=True)

            print(".", end="", flush=True)
            return details

        except Exception as e:
            return {}

    def search_by_department(self, dept, region='110'):
        """Recherche par département (utilise les CP principaux)."""
        cps = CP_IDF.get(dept)
        if cps:
            # Utiliser juste le préfixe du département
            self.search(cp=dept, region=region)
        else:
            self.search(cp=dept, region=region)

    def search_all_idf(self):
        """Recherche tous les architectes d'Île-de-France par département."""
        print("\n" + "=" * 60)
        print("Recherche de tous les architectes d'Île-de-France")
        print("=" * 60)

        for dept in ['75', '77', '78', '91', '92', '93', '94', '95']:
            print(f"\nDépartement {dept}:")
            self.search(cp=dept, region='110')
            time.sleep(2)

    def export_csv(self, filename='architectes-annuaire.csv'):
        """Exporte en CSV."""
        if not self.results:
            print("\nAucun résultat à exporter")
            return

        # Dédupliquer par matricule
        seen = set()
        unique = []
        for r in self.results:
            key = r.get('matricule', '')
            if key and key not in seen:
                seen.add(key)
                unique.append(r)
            elif not key:
                unique.append(r)

        fieldnames = [
            'nom', 'telephone', 'fax', 'adresse', 'code_postal', 'ville',
            'region', 'type', 'matricule', 'date_inscription', 'diplome',
            'url_fiche', 'recherche', 'date_extraction'
        ]

        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(unique)

        print(f"\n{len(unique)} architectes exportés vers {filename}")
        return filename

    def export_json(self, filename='architectes-annuaire.json'):
        """Exporte en JSON."""
        if not self.results:
            return

        # Dédupliquer
        seen = set()
        unique = []
        for r in self.results:
            key = r.get('matricule', '')
            if key and key not in seen:
                seen.add(key)
                unique.append(r)
            elif not key:
                unique.append(r)

        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(unique, f, ensure_ascii=False, indent=2)

        print(f"{len(unique)} architectes exportés vers {filename}")

    def print_summary(self):
        """Résumé."""
        if not self.results:
            print("\nAucun résultat")
            return

        # Dédupliquer pour le résumé
        seen = set()
        unique = [r for r in self.results if r.get('matricule', '') not in seen and not seen.add(r.get('matricule', ''))]

        print(f"\nTotal: {len(unique)} architectes uniques")

        with_tel = sum(1 for r in unique if r.get('telephone'))
        with_addr = sum(1 for r in unique if r.get('adresse'))

        print(f"  Avec téléphone: {with_tel}")
        print(f"  Avec adresse: {with_addr}")

        # Par ville
        villes = {}
        for r in unique:
            v = r.get('ville', 'Inconnue')
            villes[v] = villes.get(v, 0) + 1

        if villes:
            print("\nPar ville (top 15):")
            for v, c in sorted(villes.items(), key=lambda x: -x[1])[:15]:
                print(f"  {v}: {c}")


def main():
    parser = argparse.ArgumentParser(description="Scraper annuaire.architectes.org")
    parser.add_argument('--cp', default='', help='Code postal (ex: 93800, ou 93 pour tout le département)')
    parser.add_argument('--ville', default='', help='Ville')
    parser.add_argument('--region', default='110', help='Code région (110=IDF)')
    parser.add_argument('--nom', default='', help='Nom de l\'architecte')
    parser.add_argument('--dept', default='', help='Département (raccourci pour --cp)')
    parser.add_argument('--all-idf', action='store_true', help='Scraper toute l\'Île-de-France')
    parser.add_argument('--output', '-o', default='architectes-annuaire.csv', help='Fichier de sortie')

    args = parser.parse_args()

    print("=" * 60)
    print("  SCRAPER ANNUAIRE OFFICIEL DES ARCHITECTES")
    print("  annuaire.architectes.org")
    print("=" * 60)

    scraper = AnnuaireArchitectesScraper()

    if args.all_idf:
        scraper.search_all_idf()
    elif args.dept:
        scraper.search(cp=args.dept, region=args.region)
    else:
        scraper.search(cp=args.cp, ville=args.ville, region=args.region, nom=args.nom)

    scraper.print_summary()

    if scraper.results:
        scraper.export_csv(args.output)
        scraper.export_json(args.output.replace('.csv', '.json'))

    print("\nTerminé!")


if __name__ == '__main__':
    main()
