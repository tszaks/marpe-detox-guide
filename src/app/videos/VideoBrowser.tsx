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

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const filteredVideos = useMemo(() => {
    let result = videos;

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
          (video.day && `day ${video.day}`.includes(query))
      );
    }

    return result;
  }, [videos, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] items-end">
        <div className="space-y-6">
          {/* Filters */}
          <VideoFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
          
          {/* Search */}
          <VideoSearch
            onSearch={handleSearch}
            placeholder="Search by title, day, or category..."
          />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between pb-4">
          <p className="text-[13px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
            {filteredVideos.length} Videos
          </p>
          {(selectedCategory || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="text-sm font-bold text-[var(--brand-accent)] hover:underline ml-4"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Video grid */}
      <VideoGrid videos={filteredVideos} />
    </div>
  );
}
