import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Building2, Search, Phone, Mail, MapPin, ExternalLink, Download, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface Architect {
  nom: string;
  telephone: string;
  adresse: string;
  code_postal: string;
  ville: string;
  type: string;
  matricule: string;
  departement: string;
  email?: string;
  site_web?: string;
  fax?: string;
  region?: string;
  date_inscription?: string;
  diplome?: string;
  url_fiche?: string;
}

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

Mes atouts :
✓ Certification RGE
✓ Assurance décennale et RC Pro
✓ Devis détaillé sous 48h
✓ Interlocuteur unique multi-corps de métier

Ma plaquette : https://esc-belitei.vercel.app/plaquette-commerciale-belitei.pdf

Cordialement,
Gheorghii DELITEI
E.S.C BELITEI
07 61 61 54 00
contact@belitei.com`;

const PER_PAGE = 25;

export default function AnnuaireArchitectes() {
  const [architects, setArchitects] = useState<Architect[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterVille, setFilterVille] = useState('');
  const [filterHasEmail, setFilterHasEmail] = useState(false);
  const [filterHasTel, setFilterHasTel] = useState(false);
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'Annuaire Architectes IDF - E.S.C BELITEI (interne)';

    fetch('/architectes-idf.json')
      .then(r => r.json())
      .then(data => { setArchitects(data); setLoading(false); })
      .catch(() => setLoading(false));

    return () => { document.head.removeChild(meta); };
  }, []);

  const departements = useMemo(() => {
    const depts = new Map<string, number>();
    architects.forEach(a => {
      const dept = a.departement || a.code_postal?.substring(0, 2) || '';
      if (dept) depts.set(dept, (depts.get(dept) || 0) + 1);
    });
    return Array.from(depts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [architects]);

  const villes = useMemo(() => {
    const v = new Map<string, number>();
    architects.forEach(a => {
      const ville = a.ville?.trim();
      if (ville) v.set(ville, (v.get(ville) || 0) + 1);
    });
    return Array.from(v.entries()).sort((a, b) => b[1] - a[1]).slice(0, 50);
  }, [architects]);

  const filtered = useMemo(() => {
    let list = architects;

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.nom?.toLowerCase().includes(q) ||
        a.ville?.toLowerCase().includes(q) ||
        a.adresse?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q)
      );
    }

    if (filterDept) {
      list = list.filter(a => (a.departement || a.code_postal?.substring(0, 2)) === filterDept);
    }

    if (filterVille) {
      list = list.filter(a => a.ville === filterVille);
    }

    if (filterHasEmail) {
      list = list.filter(a => a.email);
    }

    if (filterHasTel) {
      list = list.filter(a => a.telephone);
    }

    return list;
  }, [architects, search, filterDept, filterVille, filterHasEmail, filterHasTel]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [search, filterDept, filterVille, filterHasEmail, filterHasTel]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyEmailBody = (archNom: string) => {
    const body = emailBody.replace('Bonjour,', `Bonjour,\n\n(Destinataire : ${archNom})`);
    navigator.clipboard.writeText(body);
    setCopiedId('email-' + archNom);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stats = useMemo(() => ({
    total: architects.length,
    withEmail: architects.filter(a => a.email).length,
    withTel: architects.filter(a => a.telephone).length,
    depts: departements.length,
  }), [architects, departements]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">Chargement de l'annuaire...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="w-6 h-6 text-amber-400" />
                Annuaire Architectes IDF
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {stats.total} architectes | {stats.withEmail} avec email | {stats.withTel} avec tél
              </p>
            </div>
            <div className="flex gap-3">
              <a href="#architectes" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm">
                Prospection
              </a>
              <a href="#accueil" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm">
                <ArrowLeft className="w-4 h-4" />
                Site
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 border text-center">
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-xs text-slate-500">Architectes</div>
          </div>
          <div className="bg-white rounded-lg p-4 border text-center">
            <div className="text-2xl font-bold text-green-600">{stats.withEmail}</div>
            <div className="text-xs text-slate-500">Avec email</div>
          </div>
          <div className="bg-white rounded-lg p-4 border text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.withTel}</div>
            <div className="text-xs text-slate-500">Avec téléphone</div>
          </div>
          <div className="bg-white rounded-lg p-4 border text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.depts}</div>
            <div className="text-xs text-slate-500">Départements</div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <div className="grid md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher par nom, ville, adresse..."
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterDept}
                onChange={e => { setFilterDept(e.target.value); setFilterVille(''); }}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Tous les départements</option>
                {departements.map(([dept, count]) => (
                  <option key={dept} value={dept}>{dept} ({count})</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filterVille}
                onChange={e => setFilterVille(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Toutes les villes</option>
                {villes.map(([ville, count]) => (
                  <option key={ville} value={ville}>{ville} ({count})</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filterHasEmail}
                onChange={e => setFilterHasEmail(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
              />
              Avec email uniquement
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filterHasTel}
                onChange={e => setFilterHasTel(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
              />
              Avec téléphone uniquement
            </label>
            <span className="text-sm text-slate-500 ml-auto">{filtered.length} résultats</span>
          </div>
        </div>

        {/* Liste */}
        <div className="space-y-2">
          {paginated.map((arch, idx) => {
            const isExpanded = expandedId === arch.matricule;
            return (
              <div key={arch.matricule || idx} className="bg-white rounded-lg border hover:border-amber-300 transition">
                <div
                  className="p-4 cursor-pointer flex items-center gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : arch.matricule)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 truncate">{arch.nom}</span>
                      {arch.email && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">email</span>}
                      {arch.telephone && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">tél</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      {arch.ville && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {arch.code_postal} {arch.ville}
                        </span>
                      )}
                      {arch.type && <span className="truncate">{arch.type.split(' ').slice(0, 3).join(' ')}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {arch.telephone && (
                      <a
                        href={`tel:${arch.telephone.replace(/[\s.]/g, '')}`}
                        onClick={e => e.stopPropagation()}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition"
                        title={arch.telephone}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {arch.email && (
                      <a
                        href={`mailto:${arch.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                        onClick={e => e.stopPropagation()}
                        className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition"
                        title={arch.email}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Détails expandés */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t pt-3 space-y-3">
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      {arch.adresse && (
                        <div>
                          <span className="text-slate-500">Adresse :</span>
                          <span className="ml-2 text-slate-900">{arch.adresse}</span>
                        </div>
                      )}
                      {arch.telephone && (
                        <div>
                          <span className="text-slate-500">Tél :</span>
                          <span className="ml-2 text-slate-900">{arch.telephone}</span>
                          <button
                            onClick={() => copyToClipboard(arch.telephone, 'tel-' + arch.matricule)}
                            className="ml-2 text-slate-400 hover:text-slate-600"
                          >
                            {copiedId === 'tel-' + arch.matricule ? <Check className="w-3 h-3 inline text-green-600" /> : <Copy className="w-3 h-3 inline" />}
                          </button>
                        </div>
                      )}
                      {arch.fax && (
                        <div>
                          <span className="text-slate-500">Fax :</span>
                          <span className="ml-2 text-slate-900">{arch.fax}</span>
                        </div>
                      )}
                      {arch.email && (
                        <div>
                          <span className="text-slate-500">Email :</span>
                          <span className="ml-2 text-slate-900">{arch.email}</span>
                          <button
                            onClick={() => copyToClipboard(arch.email!, 'em-' + arch.matricule)}
                            className="ml-2 text-slate-400 hover:text-slate-600"
                          >
                            {copiedId === 'em-' + arch.matricule ? <Check className="w-3 h-3 inline text-green-600" /> : <Copy className="w-3 h-3 inline" />}
                          </button>
                        </div>
                      )}
                      {arch.site_web && (
                        <div>
                          <span className="text-slate-500">Site :</span>
                          <a href={arch.site_web} target="_blank" rel="noopener noreferrer" className="ml-2 text-amber-600 hover:underline">
                            {arch.site_web.replace(/https?:\/\/(www\.)?/, '').slice(0, 30)}
                            <ExternalLink className="w-3 h-3 inline ml-1" />
                          </a>
                        </div>
                      )}
                      {arch.date_inscription && (
                        <div>
                          <span className="text-slate-500">Inscrit depuis :</span>
                          <span className="ml-2 text-slate-900">{arch.date_inscription}</span>
                        </div>
                      )}
                      {arch.diplome && (
                        <div className="md:col-span-2">
                          <span className="text-slate-500">Diplôme :</span>
                          <span className="ml-2 text-slate-900 text-xs">{arch.diplome}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {arch.email && (
                        <a
                          href={`mailto:${arch.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                          className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded transition"
                        >
                          <Mail className="w-3 h-3" />
                          Envoyer email de prospection
                        </a>
                      )}
                      {arch.email && (
                        <button
                          onClick={() => copyEmailBody(arch.nom)}
                          className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded transition"
                        >
                          {copiedId === 'email-' + arch.nom ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                          Copier email type
                        </button>
                      )}
                      {arch.url_fiche && (
                        <a
                          href={arch.url_fiche}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Fiche officielle
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-600 px-4">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Export */}
        <div className="mt-6 text-center">
          <a
            href="/architectes-idf.json"
            download
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <Download className="w-4 h-4" />
            Télécharger les données (JSON)
          </a>
        </div>
      </div>

      <footer className="text-center py-6 text-sm text-slate-400">
        Usage interne uniquement - E.S.C BELITEI
      </footer>
    </div>
  );
}
