// Recipe from Notion database
export interface Recipe {
  id: string;
  slug: string;
  name: string;
  recipeTypes: RecipeType[];
  createdAt: string;
  submitterName?: string;
  status: 'Approved' | 'Pending';
  // Content from page body (parsed)
  description?: string;
  ingredients: string[];
  instructions: string[];
  servingSuggestions?: string[];
  // Raw content for fallback
  rawContent: string;
}

export type RecipeType =
  | 'Entrees'
  | 'Side'
  | 'Seafood'
  | 'Vegetable'
  | 'Soup'
  | 'Snacks'
  | 'Dessert'
  | 'Beverage'
  | 'Miscellaneous'
  | 'Condiments'
  | 'Client Submission';

// Form submission data
export interface RecipeSubmission {
  submitterName: string;
  recipeName: string;
  ingredients: string;
  instructions: string;
}

// API response types
export interface SubmitRecipeResponse {
  success: boolean;
  message: string;
  recipeId?: string;
}

// Testimonial data
export interface Testimonial {
  id: string;
  initials: string;
  quote: string;
  isQuickWin: boolean;
}

// Form submission data for testimonials
export interface TestimonialSubmission {
  name: string;
  initials: string;
  quote: string;
}

// API response types for testimonials
export interface SubmitTestimonialResponse {
  success: boolean;
  message: string;
  testimonialId?: string;
}

// Quick link for external URLs
export interface QuickLink {
  label: string;
  url: string;
  icon: string;
}

// Food item for avoid/approved lists
export interface FoodItem {
  name: string;
  note?: string;
}

export interface FoodCategory {
  name: string;
  items: (FoodItem | FoodCategory)[];
}

// Video data
export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnailUrl?: string;
  youtubeId?: string;  // Optional - for YouTube playlist videos
  facebookUrl?: string;  // For Facebook Reel videos
  transcription?: string;  // Transcription text
  category: VideoCategory;
  day?: number;
  index?: number;
  isRecent?: boolean;  // Computed - marks newest videos
  isPinned?: boolean;  // Computed - marks pinned featured video
}

export type VideoCategory = 'Daily Update' | 'Recipe' | 'Tip' | 'Workshop' | 'Prep';
