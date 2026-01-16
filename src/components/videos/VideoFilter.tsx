'use client';

interface VideoFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  showArchived: boolean;
  onToggleArchived: () => void;
  years: number[];
}

export function VideoFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedYear,
  onSelectYear,
  showArchived,
  onToggleArchived,
  years,
}: VideoFilterProps) {
  return (
    <div className="space-y-4">
      {/* Year Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mr-2">Year:</span>
        <button
          onClick={() => onSelectYear(null)}
          className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
            selectedYear === null
              ? 'bg-[var(--brand-primary)] text-white shadow-sm'
              : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
          }`}
        >
          All Years
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
              selectedYear === year
                ? 'bg-[var(--brand-primary)] text-white shadow-sm'
                : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
            }`}
          >
            {year}
          </button>
        ))}

        {/* Non-Detox Toggle */}
        <button
          onClick={onToggleArchived}
          className={`ml-4 rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
            showArchived
              ? 'bg-purple-500 text-white shadow-sm'
              : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
          }`}
          title="Show cooking demos, recipes, and other non-detox videos"
        >
          {showArchived ? '✓ + Non-Detox' : '+ Non-Detox'}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-[var(--brand-accent)] text-white shadow-sm'
              : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
          }`}
        >
          All Categories
        </button>
        {categories.filter(c => c !== 'All').map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-[var(--brand-accent)] text-white shadow-sm'
                : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
