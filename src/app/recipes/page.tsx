import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getApprovedRecipes, getRecipeCategories } from '@/lib/recipes';
import { RecipeBrowser } from './RecipeBrowser';

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Browse our collection of delicious, detox-approved recipes.',
};

// Revalidate every 60 seconds
export const revalidate = 60;

async function RecipeList() {
  const recipes = await getApprovedRecipes();
  const categories = await getRecipeCategories();

  return <RecipeBrowser recipes={recipes} categories={categories} />;
}

function RecipeListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search skeleton */}
      <div className="h-12 bg-[var(--muted)] rounded-full animate-pulse" />

      {/* Filter skeleton */}
      <div className="flex gap-2 flex-wrap">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-[var(--muted)] rounded-full animate-pulse"
          />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-[var(--muted)] rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function RecipesPage() {
  return (
    <div className="bg-[#fbfbfd] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-[12px] font-bold tracking-[0.2em] text-[var(--brand-accent)] uppercase mb-4 block">
            Recipes
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl mb-6">
            <span className="text-gradient">Whole-Food</span>
            <br />
            <span className="green-gradient">Nourishment.</span>
          </h1>
          <p className="mt-8 text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-normal leading-relaxed">
            Delicious, detox-friendly recipes to keep you satisfied and on track.
          </p>
        </div>

        {/* Recipe browser with search/filter */}
        <Suspense fallback={<RecipeListSkeleton />}>
          <RecipeList />
        </Suspense>
      </div>
    </div>
  );
}
