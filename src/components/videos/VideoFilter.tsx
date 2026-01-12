'use client';

interface VideoFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function VideoFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: VideoFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-[var(--brand-accent)] text-white shadow-sm'
            : 'bg-white text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/40 hover:border-[var(--border)]'
        }`}
      >
        All Videos
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
  );
}
