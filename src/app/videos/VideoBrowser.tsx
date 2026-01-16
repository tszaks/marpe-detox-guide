'use client';

import { useMemo, useState, useCallback } from 'react';
import type { Video } from '@/types';
import { VideoSearch, VideoFilter, VideoGrid } from '@/components/videos';

interface VideoBrowserProps {
  videos: Video[];
  categories: string[];
}

export function VideoBrowser({ videos, categories }: VideoBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  // Get unique years from videos
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    videos.forEach(v => {
      if (v.year) yearSet.add(v.year);
    });
    return Array.from(yearSet).sort((a, b) => b - a); // Descending
  }, [videos]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const handleYearSelect = useCallback((year: number | null) => {
    setSelectedYear(year);
  }, []);

  const handleSetShowArchived = useCallback((show: boolean) => {
    setShowArchived(show);
  }, []);

  const filteredVideos = useMemo(() => {
    let result = videos;

    // Filter archived by default (only show if toggled on)
    if (!showArchived) {
      result = result.filter((video) => !video.isArchived);
    }

    // Filter by year
    if (selectedYear) {
      result = result.filter((video) => video.year === selectedYear);
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((video) => video.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.category.toLowerCase().includes(query) ||
          (video.day && `day ${video.day}`.includes(query)) ||
          (video.year && `${video.year}`.includes(query))
      );
    }

    return result;
  }, [videos, selectedCategory, selectedYear, showArchived, searchQuery]);

  const hasFilters = selectedCategory || selectedYear || searchQuery || showArchived;

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] items-end">
        <div className="space-y-6">
          {/* Filters */}
          <VideoFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            selectedYear={selectedYear}
            onSelectYear={handleYearSelect}
            showArchived={showArchived}
            onSetShowArchived={handleSetShowArchived}
            years={years}
          />

          {/* Search */}
          <VideoSearch
            onSearch={handleSearch}
            placeholder="Search by title, day, year, or category..."
          />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between pb-4">
          <p className="text-[13px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
            {filteredVideos.length} Videos
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setSelectedYear(null);
                setShowArchived(false);
              }}
              className="text-sm font-bold text-[var(--brand-accent)] hover:underline ml-4"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Video grid */}
      <VideoGrid videos={filteredVideos} />
    </div>
  );
}
