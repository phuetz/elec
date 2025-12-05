import { Award, Briefcase, Languages, GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            À propos
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Gheorghii BELITEI - Électricien polyvalent avec 25 ans d'expérience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Expérience professionnelle</h3>
              </div>
              <div className="space-y-4 ml-15 pl-6 border-l-2 border-amber-500">
                <div>
                  <p className="font-semibold text-slate-900">2020 - 2025</p>
                  <p className="text-slate-700">Travaux tous corps d'état dans le bâtiment</p>
                  <p className="text-sm text-slate-600">Auto-entrepreneur - Entreprise BELITEI</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">2018 - 2020</p>
                  <p className="text-slate-700">Électricien qualifié</p>
                  <p className="text-sm text-slate-600">Marly Service - Mareil Marly</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">2016 - 2018</p>
                  <p className="text-slate-700">Missions d'intérim électricité</p>
                  <p className="text-sm text-slate-600">Divers chantiers</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">2014 - 2016</p>
                  <p className="text-slate-700">Électricien</p>
                  <p className="text-sm text-slate-600">E.S.C. (Electricité Systèmes Communiquant) - Nanterre</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">2000 - 2014</p>
                  <p className="text-slate-700">Travaux tous corps d'état</p>
                  <p className="text-sm text-slate-600">Entreprise Edouard - Champigny-sur-Marne</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Formation</h3>
              </div>
              <div className="space-y-3 ml-15">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="font-semibold text-slate-900">2024</p>
                  <p className="text-slate-700">Certification RGE</p>
                  <p className="text-sm text-slate-600">Formation et obtention de la certification RGE (France)</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="font-semibold text-slate-900">1994</p>
                  <p className="text-slate-700">Niveau Baccalauréat</p>
                  <p className="text-sm text-slate-600">Moldavie</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Compétences</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-50 to-white rounded-lg p-5 border border-amber-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Électricité</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Tableaux électriques, installation de caméras et interphones, câblage complet,
                    courants forts et courants faibles. Équipement électrique complet pour appartements et pavillons.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-white rounded-lg p-5 border border-amber-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Installations intérieures</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Installation de salles de bains, cuisines, WC, pose de parquets, carrelages
                    et tous autres travaux d'aménagement intérieur.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-white rounded-lg p-5 border border-amber-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Lecture de plans</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Capacité à lire et interpréter les plans d'architectes pour une mise en œuvre précise.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Langues</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                  <p className="font-semibold text-slate-900">Moldave</p>
                  <p className="text-xs text-slate-600">Langue maternelle</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                  <p className="font-semibold text-slate-900">Russe</p>
                  <p className="text-xs text-slate-600">Courant</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                  <p className="font-semibold text-slate-900">Français</p>
                  <p className="text-xs text-slate-600">Courant</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Certification RGE</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Certifié Reconnu Garant de l'Environnement (RGE) depuis 2024,
                garantissant des travaux de qualité respectant les normes environnementales
                et permettant à mes clients de bénéficier d'aides financières pour leurs projets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
