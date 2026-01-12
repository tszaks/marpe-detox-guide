'use client';

import type { RecipeType } from '@/types';

interface RecipeFilterProps {
  categories: RecipeType[];
  selectedCategory: RecipeType | null;
  onSelectCategory: (category: RecipeType | null) => void;
}

export function RecipeFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: RecipeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      <button
        onClick={() => onSelectCategory(null)}
        className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 ${
          selectedCategory === null
            ? 'bg-[var(--brand-accent)] text-white shadow-apple'
            : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-[var(--brand-accent)] text-white shadow-apple'
              : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
