import { Search } from 'lucide-react';
import type { Recipe } from '@/types';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <Search className="h-16 w-16 text-[var(--muted-foreground)] opacity-20" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">No recipes found</h3>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
