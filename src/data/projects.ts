export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  completed_date: string;
  // Pour les projets avant/après
  before_image_url?: string;
  after_image_url?: string;
  // Galerie de photos (étapes du chantier)
  gallery?: { url: string; label: string }[];
}

export const projects: Project[] = [
  // PAVÉS / EXTÉRIEUR
  {
    id: '1',
    title: 'Allée pavée avec portail',
    description: 'Création d\'une allée carrossable en pavés anciens avec portail blanc. Pose en éventail et finitions soignées.',
    category: 'exterieur',
    image_url: '/images/20251103_122751.jpg',
    completed_date: '2025-11-03',
  },

  // SALLE DE BAIN
  {
    id: '2',
    title: 'Douche italienne mosaïque',
    description: 'Création d\'une douche à l\'italienne avec carrelage mosaïque, colonne de douche et paroi vitrée.',
    category: 'salle-de-bain',
    image_url: '/images/20250912_131936.jpg',
    completed_date: '2025-09-12',
  },
  {
    id: '3',
    title: 'Douche moderne',
    description: 'Installation douche avec receveur extra-plat, paroi vitrée et carrelage grand format gris.',
    category: 'salle-de-bain',
    image_url: '/images/20250725_130123.jpg',
    completed_date: '2025-07-25',
  },

  // ÉLECTRICITÉ
  {
    id: '4',
    title: 'Tableau électrique neuf',
    description: 'Installation tableau électrique complet avec disjoncteurs, différentiel et goulotte. Conforme NF C 15-100.',
    category: 'electricite',
    image_url: '/images/20250616_123355.jpg',
    completed_date: '2025-06-16',
  },
  {
    id: '5',
    title: 'Installation prises et interphone',
    description: 'Création de multiples points électriques avec boîtiers d\'encastrement et installation interphone.',
    category: 'electricite',
    image_url: '/images/20221217_155007.jpg',
    completed_date: '2022-12-17',
  },
  {
    id: '6',
    title: 'Coffret de communication',
    description: 'Installation coffret réseau avec box internet, baie de brassage et tableau électrique. Câblage RJ45 complet.',
    category: 'electricite',
    image_url: '/images/20221217_155000.jpg',
    completed_date: '2022-12-17',
  },

  // VMC / VENTILATION
  {
    id: '7',
    title: 'VMC Aldes EasyHOME',
    description: 'Installation VMC double flux Aldes avec trappe d\'accès. Qualité d\'air optimale et économies d\'énergie.',
    category: 'ventilation',
    image_url: '/images/20250615_202402.jpg',
    completed_date: '2025-06-15',
  },
  {
    id: '8',
    title: 'Bouche d\'extraction Aldes',
    description: 'Pose de bouche d\'extraction VMC Aldes. Finition discrète avec grille design.',
    category: 'ventilation',
    image_url: '/images/20230130_141909.jpg',
    completed_date: '2023-01-30',
  },

  // PLOMBERIE / CHAUFFAGE
  {
    id: '9',
    title: 'Chauffe-eau Ariston',
    description: 'Installation chauffe-eau électrique Ariston avec groupe de sécurité et raccordements cuivre.',
    category: 'plomberie',
    image_url: '/images/20251006_093147.jpg',
    completed_date: '2025-10-06',
  },

  // CARRELAGE
  {
    id: '10',
    title: 'Pose carrelage sol',
    description: 'Rénovation sol avec pose de carrelage grand format. Ragréage et joints soignés.',
    category: 'carrelage',
    image_url: '/images/20251024_095708.jpg',
    completed_date: '2025-10-24',
  },

  // COMBLES / ISOLATION
  {
    id: '11',
    title: 'Aménagement combles',
    description: 'Préparation combles avec pose de plancher OSB et isolation sous rampants. Charpente traditionnelle.',
    category: 'renovation-complete',
    image_url: '/images/20251024_145423.jpg',
    completed_date: '2025-10-24',
  },

  // PRÉPARATION CHANTIER
  {
    id: '12',
    title: 'Préparation pièce à rénover',
    description: 'Démolition et préparation d\'une pièce avant rénovation complète. Murs prêts pour isolation et placo.',
    category: 'renovation-complete',
    image_url: '/images/20251103_161148.jpg',
    completed_date: '2025-11-03',
  },

  // RÉNOVATION
  {
    id: '13',
    title: 'Rénovation bureau',
    description: 'Transformation espace de travail : parquet chevron, peinture vert d\'eau, spots LED et prises.',
    category: 'renovation-complete',
    image_url: '/images/20221217_154854.jpg',
    completed_date: '2022-12-17',
  },

  // CUISINE
  {
    id: '14',
    title: 'Cuisine moderne terminée',
    description: 'Cuisine équipée avec meubles blancs, crédence carrelée noire et suspensions design.',
    category: 'cuisine',
    image_url: '/images/20230213_103309.jpg',
    completed_date: '2023-02-13',
  },
  {
    id: '15',
    title: 'Éclairage LED cuisine',
    description: 'Installation éclairage LED sous meubles hauts. Ambiance moderne et fonctionnelle.',
    category: 'cuisine',
    image_url: '/images/20230202_170002.jpg',
    completed_date: '2023-02-02',
  },

  // RÉNOVATION SALLE DE BAIN - DÉCEMBRE 2025 (Avant/Après)
  {
    id: '16',
    title: 'Rénovation salle de bain complète',
    description: 'Installation VMC Aldes EasyHOME avec coffrage placo hydro, spots LED encastrés et finitions soignées.',
    category: 'salle-de-bain',
    image_url: '/images/20251219_090902.jpg',
    completed_date: '2025-12-19',
    before_image_url: '/images/20251215_150042.jpg',
    after_image_url: '/images/20251219_090902.jpg',
    gallery: [
      { url: '/images/20251215_121609.jpg', label: 'Avant - Vue générale' },
      { url: '/images/20251215_150042.jpg', label: 'VMC Aldes installée' },
      { url: '/images/20251216_113314.jpg', label: 'Coffrage placo hydro' },
      { url: '/images/20251216_113322.jpg', label: 'Trappe d\'accès VMC' },
      { url: '/images/20251216_144410.jpg', label: 'Enduit en cours' },
      { url: '/images/20251216_144418.jpg', label: 'Préparation peinture' },
      { url: '/images/20251217_130633.jpg', label: 'Coffrage peint' },
      { url: '/images/20251217_130639.jpg', label: 'Finitions plafond' },
      { url: '/images/20251218_132435.jpg', label: 'Spots LED installés' },
      { url: '/images/20251218_132441.jpg', label: 'Éclairage terminé' },
      { url: '/images/20251218_132447.jpg', label: 'Vue avec meuble' },
      { url: '/images/20251219_090856.jpg', label: 'Résultat final' },
      { url: '/images/20251219_090902.jpg', label: 'Après - Vue complète' },
    ],
  },
];
