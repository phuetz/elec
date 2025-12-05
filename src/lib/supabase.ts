import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  completed_date: string;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  project_type: string;
}
