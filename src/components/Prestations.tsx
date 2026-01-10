import { useState } from 'react';
import {
  ChevronDown,
  Zap,
  Droplets,
  Home,
  Paintbrush,
  Wind,
  Wrench,
  ChefHat,
  Bath,
  TreePine,
  Check
} from 'lucide-react';

interface ServiceItem {
  name: string;
  details?: string;
}

interface ServiceCategory {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  services: ServiceItem[];
}

const categories: ServiceCategory[] = [
  {
    id: 'electricite',
    icon: Zap,
    title: 'Électricité',
    color: 'bg-yellow-500',
    services: [
      { name: 'Installation électrique complète', details: 'Neuf ou rénovation' },
      { name: 'Mise aux normes NF C 15-100' },
      { name: 'Tableau électrique', details: 'Installation et remplacement' },
      { name: 'Changement de compteur', details: 'Passage Linky, augmentation puissance' },
      { name: 'Prises et interrupteurs', details: 'Pose, remplacement, ajout de points' },
      { name: 'Éclairage LED', details: 'Spots encastrés, bandeaux, suspensions' },
      { name: 'Coffret de communication', details: 'Box, baie de brassage, RJ45' },
      { name: 'Interphone / Visiophone' },
      { name: 'Volets roulants électriques' },
      { name: 'Détecteurs de fumée' },
      { name: 'Dépannage électrique urgent' },
      { name: 'Diagnostic électrique' },
    ]
  },
  {
    id: 'plomberie',
    icon: Droplets,
    title: 'Plomberie',
    color: 'bg-blue-500',
    services: [
      { name: 'Installation sanitaires', details: 'WC, lavabo, douche, baignoire' },
      { name: 'Chauffe-eau', details: 'Électrique, thermodynamique, remplacement' },
      { name: 'Chaudière', details: 'Installation et raccordement' },
      { name: 'Robinetterie', details: 'Pose et remplacement' },
      { name: 'Alimentation en eau', details: 'Cuivre, PER, multicouche' },
      { name: 'Évacuations PVC' },
      { name: 'Raccordement machine à laver / lave-vaisselle' },
      { name: 'Fuite d\'eau', details: 'Recherche et réparation' },
      { name: 'Débouchage canalisations' },
      { name: 'Groupe de sécurité' },
      { name: 'Réducteur de pression' },
    ]
  },
  {
    id: 'salle-de-bain',
    icon: Bath,
    title: 'Salle de bain',
    color: 'bg-cyan-500',
    services: [
      { name: 'Rénovation complète salle de bain' },
      { name: 'Création douche italienne' },
      { name: 'Remplacement baignoire par douche' },
      { name: 'Pose receveur extra-plat' },
      { name: 'Paroi de douche vitrée' },
      { name: 'Carrelage mural et sol' },
      { name: 'Faïence et mosaïque' },
      { name: 'Meuble vasque', details: 'Simple ou double' },
      { name: 'Miroir et éclairage' },
      { name: 'Sèche-serviettes électrique' },
      { name: 'Plafond tendu ou PVC' },
      { name: 'Étanchéité et imperméabilisation' },
    ]
  },
  {
    id: 'cuisine',
    icon: ChefHat,
    title: 'Cuisine',
    color: 'bg-orange-500',
    services: [
      { name: 'Installation cuisine équipée' },
      { name: 'Pose meubles hauts et bas' },
      { name: 'Plan de travail', details: 'Stratifié, bois, quartz' },
      { name: 'Crédence', details: 'Carrelage, verre, inox' },
      { name: 'Évier et robinetterie' },
      { name: 'Raccordement électroménagers', details: 'Four, plaque, hotte, lave-vaisselle' },
      { name: 'Éclairage sous meubles LED' },
      { name: 'Prises plan de travail' },
      { name: 'Hotte aspirante', details: 'Pose et raccordement' },
      { name: 'Modification circuits eau/élec' },
    ]
  },
  {
    id: 'ventilation',
    icon: Wind,
    title: 'Ventilation / VMC',
    color: 'bg-teal-500',
    services: [
      { name: 'VMC simple flux' },
      { name: 'VMC double flux', details: 'Aldes, Atlantic, Unelvent' },
      { name: 'VMC hygroréglable' },
      { name: 'Bouches d\'extraction' },
      { name: 'Entrées d\'air' },
      { name: 'Remplacement VMC existante' },
      { name: 'Nettoyage gaines VMC' },
      { name: 'Trappe d\'accès et coffrage' },
      { name: 'Extracteur salle de bain' },
      { name: 'Ventilation cave / garage' },
    ]
  },
  {
    id: 'carrelage',
    icon: Home,
    title: 'Carrelage / Sol',
    color: 'bg-stone-500',
    services: [
      { name: 'Pose carrelage sol', details: 'Tous formats' },
      { name: 'Pose carrelage mural' },
      { name: 'Faïence salle de bain / cuisine' },
      { name: 'Mosaïque décorative' },
      { name: 'Carrelage grand format', details: '60x60, 60x120, 80x80' },
      { name: 'Carrelage imitation parquet' },
      { name: 'Ragréage et préparation sol' },
      { name: 'Pose sur plancher chauffant' },
      { name: 'Joints et finitions' },
      { name: 'Plinthes carrelage' },
      { name: 'Seuils de porte' },
    ]
  },
  {
    id: 'parquet',
    icon: Home,
    title: 'Parquet / Revêtement de sol',
    color: 'bg-amber-600',
    services: [
      { name: 'Parquet massif', details: 'Chêne, hêtre, bambou' },
      { name: 'Parquet flottant / stratifié' },
      { name: 'Parquet contrecollé' },
      { name: 'Pose en chevron / point de Hongrie' },
      { name: 'Pose droite ou décalée' },
      { name: 'Sous-couche acoustique' },
      { name: 'Sol vinyle / PVC' },
      { name: 'Plinthes bois ou MDF' },
      { name: 'Barres de seuil' },
      { name: 'Rénovation parquet ancien', details: 'Ponçage, vitrification' },
    ]
  },
  {
    id: 'peinture',
    icon: Paintbrush,
    title: 'Peinture / Finitions',
    color: 'bg-purple-500',
    services: [
      { name: 'Peinture murs et plafonds' },
      { name: 'Peinture plafond tendu' },
      { name: 'Enduit de lissage' },
      { name: 'Ratissage murs' },
      { name: 'Rebouchage fissures' },
      { name: 'Préparation supports' },
      { name: 'Peinture boiseries' },
      { name: 'Peinture radiateurs' },
      { name: 'Pose papier peint / toile de verre' },
      { name: 'Crépi intérieur' },
    ]
  },
  {
    id: 'renovation',
    icon: Wrench,
    title: 'Rénovation complète',
    color: 'bg-slate-600',
    services: [
      { name: 'Rénovation appartement complet' },
      { name: 'Rénovation maison' },
      { name: 'Aménagement combles' },
      { name: 'Création de pièces', details: 'Cloisons, portes' },
      { name: 'Démolition / dépose' },
      { name: 'Placo et cloisons sèches', details: 'BA13, hydro, phonique' },
      { name: 'Isolation thermique et phonique' },
      { name: 'Faux plafond suspendu' },
      { name: 'Doublage murs' },
      { name: 'Ouverture de mur porteur', details: 'Avec IPN' },
      { name: 'Modification de volumes' },
      { name: 'Gestion de chantier complète' },
    ]
  },
  {
    id: 'exterieur',
    icon: TreePine,
    title: 'Extérieur / Aménagement',
    color: 'bg-green-600',
    services: [
      { name: 'Allée pavée', details: 'Pavés anciens, béton, gravier' },
      { name: 'Terrasse', details: 'Carrelage, bois, composite' },
      { name: 'Portail et clôture' },
      { name: 'Éclairage extérieur' },
      { name: 'Interphone / visiophone' },
      { name: 'Prise extérieure étanche' },
      { name: 'Bordures et délimitations' },
      { name: 'Petit maçonnerie', details: 'Muret, seuil, appui' },
    ]
  },
];

export default function Prestations() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['electricite']));

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setOpenCategories(new Set(categories.map(c => c.id)));
  };

  const collapseAll = () => {
    setOpenCategories(new Set());
  };

  return (
    <section id="prestations" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Nos Prestations
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
            Liste complète de tous nos services de rénovation et d'aménagement
          </p>

          {/* Expand/Collapse buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={expandAll}
              className="px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Tout déplier
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Tout replier
            </button>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isOpen = openCategories.has(category.id);

            return (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {category.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {category.services.length} prestations
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Category Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <div className="border-t border-slate-100 pt-4">
                      <ul className="space-y-3">
                        {category.services.map((service, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 group"
                          >
                            <div className="mt-1 flex-shrink-0">
                              <Check className="w-4 h-4 text-amber-500" />
                            </div>
                            <div>
                              <span className="text-slate-800 font-medium group-hover:text-amber-600 transition-colors">
                                {service.name}
                              </span>
                              {service.details && (
                                <span className="text-slate-500 text-sm ml-2">
                                  — {service.details}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-900 font-medium mb-4">
              Vous ne trouvez pas votre besoin dans la liste ?
            </p>
            <p className="text-amber-700 text-sm mb-4">
              Contactez-nous pour discuter de votre projet. Nous nous adaptons à vos besoins spécifiques.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Demander un devis gratuit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
