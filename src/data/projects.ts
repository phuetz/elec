export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  completed_date: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Rénovation complète appartement 75m²',
    description: 'Rénovation totale incluant électricité, parquet chêne massif, cuisine équipée et peinture. Projet réalisé en 6 semaines.',
    category: 'renovation-complete',
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    completed_date: '2024-03-15',
  },
  {
    id: '2',
    title: 'Installation cuisine moderne',
    description: 'Pose d\'une cuisine contemporaine avec électroménagers intégrés, plan de travail en quartz et éclairage LED.',
    category: 'cuisine',
    image_url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800',
    completed_date: '2024-02-20',
  },
  {
    id: '3',
    title: 'Mise aux normes électrique',
    description: 'Remplacement du tableau électrique, mise aux normes complète et installation de prises supplémentaires.',
    category: 'electricite',
    image_url: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
    completed_date: '2024-01-10',
  },
  {
    id: '4',
    title: 'Pose parquet massif 120m²',
    description: 'Installation de parquet chêne massif dans une maison avec finition vernis mat et plinthes assorties.',
    category: 'parquet',
    image_url: 'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=800',
    completed_date: '2023-12-05',
  },
  {
    id: '5',
    title: 'Changement compteur Linky',
    description: 'Remplacement compteur électrique et mise en conformité de l\'installation avec les nouvelles normes.',
    category: 'electricite',
    image_url: 'https://images.pexels.com/photos/1484759/pexels-photo-1484759.jpeg?auto=compress&cs=tinysrgb&w=800',
    completed_date: '2024-04-01',
  },
  {
    id: '6',
    title: 'Rénovation salle de bain',
    description: 'Création d\'une salle de bain moderne avec douche italienne, carrelage grand format et éclairage LED.',
    category: 'salle-de-bain',
    image_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    completed_date: '2024-02-28',
  },
];
