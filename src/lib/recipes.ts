import { supabase, isSupabaseConfigured, DbRecipe } from './supabase';
import type { Recipe, RecipeSubmission, RecipeType } from '@/types';
import { slugify } from './slugify';

// Fallback mock recipes when Supabase isn't configured
const MOCK_RECIPES: Recipe[] = [
  {
    id: 'mock-1',
    slug: 'spinach-vegetable-soup',
    name: 'Spinach Vegetable Soup',
    recipeTypes: ['Entrees', 'Soup'],
    createdAt: '2024-12-31T14:11:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'A nourishing vegetable soup packed with spinach and detox-friendly ingredients.',
    ingredients: ['Spinach', 'Vegetable broth', 'Onions', 'Garlic', 'Carrots', 'Celery'],
    instructions: ['Sauté vegetables in a pot.', 'Add broth and simmer.', 'Stir in spinach until wilted.', 'Serve warm.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'mock-2',
    slug: 'dijon-roasted-turkey',
    name: 'Dijon Roasted Turkey',
    recipeTypes: ['Entrees'],
    createdAt: '2024-12-31T14:16:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Flavorful roasted turkey with a zesty Dijon mustard coating.',
    ingredients: ['Turkey breast', 'Dijon mustard', 'Olive oil', 'Herbs', 'Salt', 'Pepper'],
    instructions: ['Preheat oven.', 'Rub turkey with mustard mixture.', 'Roast until cooked through.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'mock-3',
    slug: 'baked-sweet-potato-slices',
    name: 'Baked Sweet-Potato Slices',
    recipeTypes: ['Side'],
    createdAt: '2024-12-31T14:38:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Simple and satisfying sweet potato slices baked to perfection.',
    ingredients: ['Sweet potatoes', 'Olive oil', 'Sea salt'],
    instructions: ['Slice sweet potatoes.', 'Toss with oil and salt.', 'Bake until tender.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'mock-4',
    slug: 'kale-chips',
    name: 'Kale Chips',
    recipeTypes: ['Snacks'],
    createdAt: '2024-12-31T17:20:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'A crispy, salty snack alternative to potato chips.',
    ingredients: ['Kale', 'Olive oil', 'Sea salt'],
    instructions: ['Massage oil into kale leaves.', 'Bake until crispy but not burnt.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'mock-5',
    slug: 'lentil-soup',
    name: 'Lentil Soup',
    recipeTypes: ['Entrees', 'Soup'],
    createdAt: '2024-12-31T16:30:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Hearty lentil soup rich in fiber and plant-based protein.',
    ingredients: ['Lentils', 'Vegetable broth', 'Carrots', 'Onions', 'Celery', 'Tomatoes'],
    instructions: ['Combine all ingredients in a pot.', 'Simmer until lentils are tender.'],
    servingSuggestions: [],
    rawContent: '',
  },
  {
    id: 'mock-6',
    slug: 'detox-cookies',
    name: 'Detox Cookies',
    recipeTypes: ['Dessert', 'Snacks'],
    createdAt: '2025-01-10T10:31:00Z',
    submitterName: 'Luisa Szakacs',
    status: 'Approved',
    description: 'Simple treats made with approved ingredients.',
    ingredients: ['Banana', 'Coconut flakes', 'Cinnamon'],
    instructions: ['Mash banana.', 'Mix with coconut.', 'Bake until firm.'],
    servingSuggestions: [],
    rawContent: '',
  },
];

/**
 * Map database recipe to app Recipe type
 */
function mapDbRecipeToRecipe(db: DbRecipe): Recipe {
  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    recipeTypes: db.recipe_types as RecipeType[],
    createdAt: db.created_at,
    submitterName: db.submitter_name || undefined,
    status: db.status === 'approved' ? 'Approved' : 'Pending',
    description: db.description || undefined,
    ingredients: db.ingredients,
    instructions: db.instructions,
    servingSuggestions: db.serving_suggestions || [],
    rawContent: '',
  };
}

/**
 * Fetch all approved recipes from Supabase
 */
export async function getApprovedRecipes(): Promise<Recipe[]> {
  // Fallback to mock data if Supabase isn't configured
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, using mock recipes');
    return MOCK_RECIPES;
  }

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recipes:', error);
    return MOCK_RECIPES;
  }

  return (data || []).map(mapDbRecipeToRecipe);
}

/**
 * Fetch a single recipe by slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  // Fallback to mock data if Supabase isn't configured
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_RECIPES.find(r => r.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'approved')
    .single();

  if (error || !data) {
    return MOCK_RECIPES.find(r => r.slug === slug) || null;
  }

  return mapDbRecipeToRecipe(data);
}

/**
 * Fetch a single recipe by ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  // Fallback to mock data if Supabase isn't configured
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_RECIPES.find(r => r.id === id) || null;
  }

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapDbRecipeToRecipe(data);
}

/**
 * Create a new recipe submission
 */
export async function createRecipeSubmission(
  submission: RecipeSubmission & { imageName?: string }
): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Recipe submissions are temporarily unavailable.');
  }

  const slug = slugify(submission.recipeName);

  // Parse ingredients and instructions into arrays
  const ingredients = submission.ingredients
    .split('\n')
    .map(line => line.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean);

  const instructions = submission.instructions
    .split('\n')
    .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean);

  // Generate a unique slug by appending timestamp to avoid conflicts
  // (We can't check for existing pending recipes due to RLS, so always make unique)
  const uniqueSlug = `${slug}-${Date.now()}`;

  // Note: We don't use .select('id') because RLS only allows SELECT on approved recipes,
  // and newly inserted recipes are pending. The insert will succeed but select would fail.
  const { error } = await supabase
    .from('recipes')
    .insert({
      name: submission.recipeName,
      slug: uniqueSlug,
      ingredients,
      instructions,
      recipe_types: ['Client Submission'],
      submitter_name: submission.submitterName,
      status: 'pending',
    });

  if (error) {
    console.error('Error creating recipe:', error);
    // Provide more specific error messages
    if (error.code === '23505') {
      throw new Error('A recipe with this name already exists. Please try a different name.');
    }
    if (error.code === '42501') {
      throw new Error('Permission denied. Please try again later.');
    }
    throw new Error(`Failed to submit recipe: ${error.message}`);
  }

  // Return the slug as identifier since we can't retrieve the UUID due to RLS
  return uniqueSlug;
}

/**
 * Get all unique recipe categories dynamically from database
 */
export async function getRecipeCategories(): Promise<RecipeType[]> {
  const recipes = await getApprovedRecipes();
  const categorySet = new Set<RecipeType>();
  
  recipes.forEach(recipe => {
    recipe.recipeTypes?.forEach(type => categorySet.add(type));
  });
  
  // Return categories sorted alphabetically
  return Array.from(categorySet).sort();
}
