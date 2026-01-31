import { Building2, Ruler, CheckCircle2, FileText, Clock, Shield, Phone, Mail, Users, Wrench, Download } from 'lucide-react';
import { company } from '../data/company';

const benefits = [
  {
    icon: Users,
    title: 'Interlocuteur unique',
    description: 'Un seul contact pour tous les corps de métier : électricité, plomberie, carrelage, peinture.',
  },
  {
    icon: Ruler,
    title: 'Lecture de plans',
    description: 'Capacité à interpréter les plans d\'architectes pour une mise en œuvre précise et conforme.',
  },
  {
    icon: FileText,
    title: 'Devis détaillés',
    description: 'Chiffrage transparent poste par poste, adapté aux appels d\'offres et consultations.',
  },
  {
    icon: Clock,
    title: 'Respect des délais',
    description: 'Planning rigoureux, coordination avec les autres intervenants, engagement tenu.',
  },
  {
    icon: Shield,
    title: 'Assurance décennale',
    description: 'Tous les travaux sont couverts. Attestation fournie sur demande.',
  },
  {
    icon: Wrench,
    title: 'Réactivité',
    description: 'Disponibilité pour les urgences et les interventions rapides en copropriété.',
  },
];

const syndicServices = [
  'Mise aux normes des tableaux électriques (parties communes)',
  'Installation et remplacement d\'interphones/vidéophones',
  'Éclairage parties communes (LED, détecteurs de présence)',
  'Systèmes de vidéosurveillance',
  'Rénovation de colonnes montantes',
  'Dépannages urgents',
];

const architecteServices = [
  'Électricité complète (courants forts et faibles)',
  'Rénovation de salles de bain et cuisines clé en main',
  'Pose de revêtements (parquet, carrelage)',
  'Installation VMC et ventilation',
  'Travaux de finition et second œuvre',
  'Coordination multi-lots',
];

export default function Professionals() {
  return (
    <section id="professionnels" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            Espace Professionnels
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Syndics & Architectes
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Partenaire de confiance pour vos projets de rénovation en copropriété et vos chantiers d'architecture.
            Un artisan polyvalent, certifié RGE, à votre service.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
              >
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two Columns: Syndics & Architectes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Syndics */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Syndics de Copropriété</h3>
                <p className="text-slate-600 text-sm">Interventions parties communes & privatives</p>
              </div>
            </div>
            <ul className="space-y-3">
              {syndicServices.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{service}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Certification RGE</strong> : Vos copropriétaires peuvent bénéficier des aides
                MaPrimeRénov' et CEE pour les travaux de rénovation énergétique.
              </p>
            </div>
          </div>

          {/* Architectes */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center">
                <Ruler className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Architectes & MOE</h3>
                <p className="text-slate-600 text-sm">Partenaire pour vos projets de rénovation</p>
              </div>
            </div>
            <ul className="space-y-3">
              {architecteServices.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{service}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-700">
                <strong>25 ans d'expérience</strong> : Habitué à travailler en coordination avec
                les autres corps de métier et à respecter les exigences des cahiers des charges.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Discutons de votre projet
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Devis gratuit et détaillé sous 48h. Je me déplace pour évaluer vos besoins
            et vous proposer la meilleure solution technique et financière.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}?subject=Demande de devis professionnel`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-colors border border-white/20"
            >
              <Mail className="w-5 h-5" />
              Envoyer un email
            </a>
          </div>
          <a
            href="/plaquette-commerciale-belitei.pdf"
            download
            className="inline-flex items-center justify-center gap-2 text-amber-400 hover:text-amber-300 font-medium mt-6 transition-colors"
          >
            <Download className="w-5 h-5" />
            Télécharger notre plaquette (PDF)
          </a>
          <p className="text-slate-400 text-sm mt-6">
            Zone d'intervention : Île-de-France & Oise
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              RGE
            </div>
            <span className="text-sm font-semibold text-slate-700">Certifié RGE 2024</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-semibold text-slate-700">Assurance décennale</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <FileText className="w-6 h-6 text-amber-500" />
            <span className="text-sm font-semibold text-slate-700">Devis gratuit 48h</span>
          </div>
        </div>
      </div>
    </section>
  );
}
