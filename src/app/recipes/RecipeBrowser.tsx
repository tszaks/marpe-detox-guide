'use client';

import { useMemo, useState, useCallback } from 'react';
import type { Recipe, RecipeType } from '@/types';
import { RecipeSearch, RecipeFilter, RecipeGrid } from '@/components/recipes';

interface RecipeBrowserProps {
  recipes: Recipe[];
  categories: RecipeType[];
}

export function RecipeBrowser({ recipes, categories }: RecipeBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecipeType | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((category: RecipeType | null) => {
    setSelectedCategory(category);
  }, []);

  const filteredRecipes = useMemo(() => {
    let result = recipes;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((recipe) => recipe.recipeTypes.includes(selectedCategory));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description?.toLowerCase().includes(query) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(query)) ||
          recipe.recipeTypes.some((type) => type.toLowerCase().includes(query))
      );
    }

    return result;
  }, [recipes, selectedCategory, searchQuery]);

  // Get categories that actually have recipes
  const availableCategories = useMemo(() => {
    const usedCategories = new Set<RecipeType>();
    recipes.forEach((recipe) => {
      recipe.recipeTypes.forEach((type) => usedCategories.add(type));
    });
    return categories.filter((cat) => usedCategories.has(cat));
  }, [recipes, categories]);

  return (
    <div className="space-y-8">
      {/* Search */}
      <RecipeSearch
        onSearch={handleSearch}
        placeholder="Search by name, ingredient, or category..."
      />

      {/* Filters */}
      <RecipeFilter
        categories={availableCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          Showing {filteredRecipes.length} of {recipes.length} recipes
          {selectedCategory && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        {(selectedCategory || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className="text-sm text-[var(--brand-primary)] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Recipe grid */}
      <RecipeGrid recipes={filteredRecipes} />
    </div>
  );
}
