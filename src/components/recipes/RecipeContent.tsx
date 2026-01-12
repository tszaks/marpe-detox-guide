import { Leaf, ListOrdered, Lightbulb } from 'lucide-react';
import type { Recipe } from '@/types';

interface RecipeContentProps {
  recipe: Recipe;
}

export function RecipeContent({ recipe }: RecipeContentProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      {recipe.description && (
        <div className="prose prose-green max-w-none">
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            {recipe.description}
          </p>
        </div>
      )}

      {/* Ingredients */}
      {recipe.ingredients.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--foreground)] mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-cool)]">
              <Leaf className="h-4 w-4 text-[var(--brand-accent)]" />
            </span>
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-lg bg-[var(--muted)] p-3"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-[var(--foreground)]">{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Instructions */}
      {recipe.instructions.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--foreground)] mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-warm)]">
              <ListOrdered className="h-4 w-4 text-amber-600" />
            </span>
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold">
                  {index + 1}
                </span>
                <p className="flex-1 text-[var(--foreground)] pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Serving Suggestions */}
      {recipe.servingSuggestions && recipe.servingSuggestions.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--foreground)] mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <Lightbulb className="h-4 w-4 text-purple-600" />
            </span>
            Serving Suggestions
          </h2>
          <ul className="space-y-2">
            {recipe.servingSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-[var(--foreground)]"
              >
                <span className="text-purple-500 flex-shrink-0">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Raw Content Fallback */}
      {recipe.ingredients.length === 0 &&
        recipe.instructions.length === 0 &&
        recipe.rawContent && (
          <section className="prose prose-green max-w-none">
            <div className="rounded-lg bg-[var(--muted)] p-6">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Recipe Details
              </h2>
              <div className="whitespace-pre-wrap text-[var(--foreground)]">
                {recipe.rawContent}
              </div>
            </div>
          </section>
        )}
    </div>
  );
}
