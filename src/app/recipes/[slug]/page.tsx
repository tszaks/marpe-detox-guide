import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChefHat } from 'lucide-react';
import { getApprovedRecipes, getRecipeBySlug } from '@/lib/notion';
import { RecipeContent } from '@/components/recipes';
import { Button } from '@/components/ui';

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all recipes
export async function generateStaticParams() {
  const recipes = await getApprovedRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    };
  }

  return {
    title: recipe.name,
    description: recipe.description || `${recipe.name} - A delicious detox-approved recipe`,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="bg-[var(--muted)] min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] mb-8 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Recipes
        </Link>

        {/* Recipe card */}
        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--accent-cool)] to-[var(--muted)] p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm">
                <ChefHat className="h-8 w-8 text-[var(--brand-primary)]" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                  {recipe.name}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recipe.recipeTypes.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-[var(--foreground)] shadow-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Meta info */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
              {recipe.ingredients.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {recipe.ingredients.length} ingredients
                </span>
              )}
              {recipe.instructions.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  {recipe.instructions.length} steps
                </span>
              )}
              {recipe.submitterName && (
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Submitted by {recipe.submitterName}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <RecipeContent recipe={recipe} />
          </div>
        </article>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-[var(--muted-foreground)] mb-4">
            Have a recipe to share? We&apos;d love to feature it!
          </p>
          <Link href="/submit-recipe">
            <Button>Submit Your Recipe</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
