'use client';

import { useCallback, useState, useTransition } from 'react';

interface RecipeSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function RecipeSearch({
  onSearch,
  placeholder = 'Search recipes...',
}: RecipeSearchProps) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      startTransition(() => {
        onSearch(value);
      });
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    startTransition(() => {
      onSearch('');
    });
  }, [onSearch]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        {isPending ? (
          <svg
            className="h-5 w-5 animate-spin text-[var(--muted-foreground)]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-[var(--muted-foreground)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-[16px] border border-[var(--border)]/30 bg-white/50 backdrop-blur-sm py-4 pl-12 pr-12 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:bg-white focus:border-[var(--brand-accent)]/50 focus:outline-none transition-all duration-300 shadow-sm"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
