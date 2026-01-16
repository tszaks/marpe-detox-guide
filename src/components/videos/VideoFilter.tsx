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
    <div className="flex flex-wrap gap-2 items-center">
      {/* Category Pills */}
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

      {/* Year Dropdown */}
      <select
        value={selectedYear ?? ''}
        onChange={(e) => onSelectYear(e.target.value ? Number(e.target.value) : null)}
        className="rounded-full px-4 py-2 text-[13px] font-semibold bg-white text-[var(--muted-foreground)] border border-[var(--border)]/40 hover:border-[var(--border)] transition-all duration-200 cursor-pointer appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* Type Dropdown */}
      <select
        value={showArchived ? 'all' : 'detox'}
        onChange={(e) => onToggleArchived()}
        className="rounded-full px-4 py-2 text-[13px] font-semibold bg-white text-[var(--muted-foreground)] border border-[var(--border)]/40 hover:border-[var(--border)] transition-all duration-200 cursor-pointer appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
      >
        <option value="detox">Detox Videos</option>
        <option value="all">All Videos</option>
      </select>
    </div>
  );
}
