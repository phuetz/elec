import { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, ArrowLeft, Search, Mail, Download, Building2 } from 'lucide-react';

const emailSubject = "Partenariat artisan TCE - Électricité et rénovation complète";

const emailBody = `Bonjour,

Je me permets de vous contacter car je suis artisan tous corps d'état, spécialisé en électricité, avec 25 ans d'expérience en rénovation en Île-de-France.

Je travaille régulièrement avec des architectes et maîtres d'œuvre sur des projets de rénovation complète, et je souhaiterais vous proposer mes services en tant que sous-traitant ou partenaire.

Mes domaines d'intervention :
• Électricité générale (mise aux normes, tableaux, domotique)
• Plomberie et sanitaires
• Salles de bain et cuisines clés en main
• Carrelage et revêtements
• Ventilation (VMC simple et double flux)
• Rénovation complète d'appartements

Mes atouts pour vos projets :
✓ Certification RGE - Éligibilité aides MaPrimeRénov'
✓ Assurance décennale et RC Pro
✓ Lecture de plans et respect des cahiers des charges
✓ Devis détaillé sous 48h
✓ Interlocuteur unique pour plusieurs corps de métier

Vous trouverez en pièce jointe ma plaquette de présentation avec des exemples de réalisations.

Je serais ravi d'échanger avec vous sur vos projets en cours ou à venir.

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00
contact@belitei.com
https://esc-belitei.vercel.app`;

const emailRelance = `Bonjour,

Je me permets de revenir vers vous suite à mon précédent email concernant une proposition de partenariat.

Artisan TCE avec 25 ans d'expérience, je suis spécialisé en électricité et rénovation complète en Île-de-France. Je travaille régulièrement en sous-traitance avec des architectes.

Si vous avez des projets de rénovation nécessitant un artisan polyvalent et réactif, je serais heureux d'en discuter.

Ma plaquette est disponible ici : https://esc-belitei.vercel.app/plaquette-commerciale-belitei.pdf

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00`;


export default function ArchitectesProspection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchNom, setSearchNom] = useState('');
  const [searchCp, setSearchCp] = useState('');
  const [searchVille, setSearchVille] = useState('');
  const [searchRegion, setSearchRegion] = useState('110');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'Prospection Architectes - E.S.C BELITEI (usage interne)';
    return () => { document.head.removeChild(meta); };
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMailtoLink = (email?: string) => {
    const to = email || '';
    return `mailto:${to}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="w-6 h-6 text-amber-400" />
                Prospection Architectes
              </h1>
              <p className="text-slate-400 text-sm mt-1">Page interne - Non indexée</p>
            </div>
            <a
              href="#accueil"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au site
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Étape 1 : Rechercher des architectes */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
            Rechercher des architectes sur l'annuaire officiel
          </h2>

          <form
            method="POST"
            action="https://annuaire.architectes.org/"
            target="_blank"
            className="space-y-4"
          >
            <input type="hidden" name="type" value="habilite" />
            <input type="hidden" name="posted" value="1" />
            <input type="hidden" name="me" value="0" />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nom / Cabinet</label>
                <input
                  type="text"
                  name="nom"
                  value={searchNom}
                  onChange={(e) => setSearchNom(e.target.value)}
                  placeholder="Ex: Dupont, Atelier XYZ..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Code postal</label>
                <input
                  type="text"
                  name="cp"
                  value={searchCp}
                  onChange={(e) => setSearchCp(e.target.value)}
                  maxLength={5}
                  placeholder="Ex: 93800, 75011..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
                <input
                  type="text"
                  name="ville"
                  value={searchVille}
                  onChange={(e) => setSearchVille(e.target.value)}
                  placeholder="Ex: Épinay-sur-Seine, Saint-Denis..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Région</label>
                <select
                  name="code_region"
                  value={searchRegion}
                  onChange={(e) => setSearchRegion(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Toutes les régions</option>
                  <option value="101">Auvergne-Rhône-Alpes</option>
                  <option value="102">Bourgogne-Franche-Comté</option>
                  <option value="103">Bretagne</option>
                  <option value="104">Centre-Val de Loire</option>
                  <option value="105">Corse</option>
                  <option value="106">Grand Est</option>
                  <option value="109">Hauts-de-France</option>
                  <option value="110">Île-de-France</option>
                  <option value="112">Normandie</option>
                  <option value="113">Nouvelle-Aquitaine</option>
                  <option value="114">Occitanie</option>
                  <option value="115">Pays-de-la-Loire</option>
                  <option value="116">Provence-Alpes-Côte d'Azur</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <Search className="w-5 h-5" />
              Rechercher sur annuaire.architectes.org
              <ExternalLink className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Conseil :</strong> Sur l'annuaire, cliquez sur le profil de chaque architecte pour trouver son email.
            Concentrez-vous sur les cabinets qui font de la rénovation résidentielle et des projets de taille moyenne.
          </div>
        </section>

        {/* Étape 2 : Email de prospection */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
            Envoyer l'email de prospection
          </h2>

          <div className="space-y-6">
            {/* Email principal */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b">
                <div>
                  <span className="font-semibold text-slate-900">Email de premier contact</span>
                  <p className="text-xs text-slate-500 mt-0.5">Objet : {emailSubject}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(emailSubject, 'subject')}
                    className="flex items-center gap-1 text-xs bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded transition"
                  >
                    {copiedId === 'subject' ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    Copier l'objet
                  </button>
                  <button
                    onClick={() => copyToClipboard(emailBody, 'body')}
                    className="flex items-center gap-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded transition"
                  >
                    {copiedId === 'body' ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    Copier le corps
                  </button>
                  <a
                    href={getMailtoLink()}
                    className="flex items-center gap-1 text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded transition"
                  >
                    <Mail className="w-3 h-3" />
                    Ouvrir dans email
                  </a>
                </div>
              </div>
              <pre className="p-4 text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed max-h-64 overflow-y-auto">
                {emailBody}
              </pre>
            </div>

            {/* Email de relance */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b">
                <div>
                  <span className="font-semibold text-slate-900">Email de relance</span>
                  <p className="text-xs text-slate-500 mt-0.5">À envoyer 5-7 jours après le premier email</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(emailRelance, 'relance')}
                    className="flex items-center gap-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded transition"
                  >
                    {copiedId === 'relance' ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    Copier
                  </button>
                </div>
              </div>
              <pre className="p-4 text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
                {emailRelance}
              </pre>
            </div>
          </div>
        </section>

        {/* Étape 3 : Pièce jointe */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
            Joindre la plaquette
          </h2>

          <p className="text-slate-600 mb-4">
            N'oubliez pas de joindre la plaquette commerciale à votre email de prospection.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/plaquette-commerciale-belitei.pdf"
              download
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <Download className="w-5 h-5" />
              Télécharger la plaquette PDF
            </a>
            <button
              onClick={() => copyToClipboard('https://esc-belitei.vercel.app/plaquette-commerciale-belitei.pdf', 'link')}
              className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-3 rounded-lg transition"
            >
              {copiedId === 'link' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              Copier le lien de la plaquette
            </button>
          </div>
        </section>

        {/* Conseils */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-3">Conseils de prospection</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-800">
            <div>
              <h3 className="font-semibold mb-1">Ciblage</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Privilégier les cabinets de 1-5 personnes</li>
                <li>Chercher ceux qui font de la rénovation résidentielle</li>
                <li>Cibler le 93, 92, 75, 95 en priorité</li>
                <li>Vérifier qu'ils ont des projets récents</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Bonnes pratiques</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Personnaliser le nom et un projet de l'architecte</li>
                <li>Envoyer le mardi ou jeudi matin (9h-10h)</li>
                <li>Relancer 5-7 jours après sans réponse</li>
                <li>Maximum 10-15 emails par jour</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Suivi */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Tableau de suivi rapide</h2>
          <p className="text-slate-500 text-sm mb-4">Copiez ce tableau dans un Google Sheet ou Excel pour suivre vos envois.</p>
          <button
            onClick={() => copyToClipboard(
              "Cabinet\tArchitecte\tEmail\tVille\tDate envoi\tRelance\tRéponse\tNotes\n\t\t\t\t\t\t\t",
              'tableau'
            )}
            className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-4 py-2 rounded-lg transition text-sm"
          >
            {copiedId === 'tableau' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            Copier le modèle de tableau (TSV)
          </button>
        </section>

      </div>

      <footer className="text-center py-6 text-sm text-slate-400">
        Usage interne uniquement - E.S.C BELITEI
      </footer>
    </div>
  );
}