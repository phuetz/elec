/*
  # Schéma pour site de rénovation

  1. Nouvelles Tables
    - `projects` (projets/réalisations)
      - `id` (uuid, clé primaire)
      - `title` (text, titre du projet)
      - `description` (text, description détaillée)
      - `category` (text, catégorie: electricite, parquet, cuisine, etc.)
      - `image_url` (text, URL de l'image)
      - `completed_date` (date, date de réalisation)
      - `created_at` (timestamp)
    
    - `contact_submissions` (formulaires de contact)
      - `id` (uuid, clé primaire)
      - `name` (text, nom du client)
      - `email` (text, email)
      - `phone` (text, téléphone)
      - `message` (text, message)
      - `project_type` (text, type de projet souhaité)
      - `created_at` (timestamp)
      - `status` (text, statut: nouveau, traité, archivé)

  2. Sécurité
    - RLS activé sur les deux tables
    - Lecture publique pour `projects` (affichage des réalisations)
    - Insertion publique pour `contact_submissions` (formulaire)
    - Mise à jour/suppression restreinte aux utilisateurs authentifiés
*/

-- Table des projets/réalisations
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  completed_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Table des soumissions de formulaire de contact
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  project_type text NOT NULL,
  status text DEFAULT 'nouveau',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Insérer des exemples de projets
INSERT INTO projects (title, description, category, image_url, completed_date) VALUES
  ('Rénovation complète appartement 75m²', 'Rénovation totale incluant électricité, parquet chêne massif, cuisine équipée et peinture. Projet réalisé en 6 semaines.', 'renovation-complete', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-03-15'),
  ('Installation cuisine moderne', 'Pose d''une cuisine contemporaine avec électroménagers intégrés, plan de travail en quartz et éclairage LED.', 'cuisine', 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-02-20'),
  ('Mise aux normes électrique', 'Remplacement du tableau électrique, mise aux normes complète et installation de prises supplémentaires.', 'electricite', 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-01-10'),
  ('Pose parquet massif 120m²', 'Installation de parquet chêne massif dans une maison avec finition vernis mat et plinthes assorties.', 'parquet', 'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=800', '2023-12-05'),
  ('Changement compteur Linky', 'Remplacement compteur électrique et mise en conformité de l''installation avec les nouvelles normes.', 'electricite', 'https://images.pexels.com/photos/1484759/pexels-photo-1484759.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-04-01'),
  ('Rénovation salle de bain', 'Création d''une salle de bain moderne avec douche italienne, carrelage grand format et éclairage LED.', 'salle-de-bain', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-02-28');