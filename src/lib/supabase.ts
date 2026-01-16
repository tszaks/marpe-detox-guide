import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('YOUR_PROJECT'));

// Create client only if configured (avoid errors during build)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface DbRecipe {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  ingredients: string[];
  instructions: string[];
  serving_suggestions: string[] | null;
  recipe_types: string[];
  submitter_name: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface DbRecipeSubmission {
  submitter_name: string;
  recipe_name: string;
  ingredients: string;
  instructions: string;
  image_url?: string;
}

export interface DbTestimonial {
  id: string;
  name: string;
  initials: string;
  quote: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}
