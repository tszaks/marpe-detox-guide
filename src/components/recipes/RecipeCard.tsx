import Link from 'next/link';
import { Utensils, Salad, Fish, Leaf, Soup, Cookie, Droplets, Package, User, CookingPot } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
}

// Map recipe types to Lucide icons
const typeIcons: Record<string, LucideIcon> = {
  'Main Dish': Utensils,
  'Side Dish': Salad,
  Seafood: Fish,
  Vegetable: Leaf,
  Soup: Soup,
  Snack: Cookie,
  Dessert: Cookie,
  Beverage: Droplets,
  Breakfast: Utensils,
  Salad: Leaf,
  'Sauce/Dressing': CookingPot,
  Miscellaneous: Package,
  'Client Submission': User,
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const primaryType = recipe.recipeTypes[0] || 'Miscellaneous';
  const Icon = typeIcons[primaryType] || Utensils;

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block h-full">
      <article className="h-full rounded-[24px] bg-white p-6 transition-all duration-500 hover:shadow-apple-hover hover:scale-[1.01] border border-[var(--border)]/30 relative flex flex-col overflow-hidden">
        {/* Abstract Background Icon */}
        <div className="absolute top-[-10px] right-[-10px] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
          <Icon className="h-24 w-24 text-[var(--brand-accent)]" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Category Label */}
          <span className="text-[10px] font-bold tracking-[0.1em] text-[var(--brand-accent)] uppercase mb-3 block">
            {primaryType}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-[var(--foreground)] tracking-tight group-hover:text-[var(--brand-accent)] transition-colors duration-300 line-clamp-2 leading-tight">
            {recipe.name}
          </h3>

          {/* Description */}
          {recipe.description && (
            <p className="mt-3 text-[14px] text-[var(--muted-foreground)] line-clamp-2 font-normal leading-relaxed">
              {recipe.description}
            </p>
          )}

          <div className="mt-auto pt-6">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-[12px] text-[var(--muted-foreground)] font-medium">
              <span className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-[var(--brand-accent)]/60" />
                {recipe.ingredients.length} items
              </span>
              {recipe.submitterName && (
                <span className="flex items-center gap-1.5 overflow-hidden">
                   <div className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
                   <span className="truncate">By {recipe.submitterName}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
