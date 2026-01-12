'use client';

import { Search } from 'lucide-react';
import type { Video } from '@/types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[var(--border)]">
        <div className="flex justify-center mb-4">
          <Search className="h-16 w-16 text-[var(--muted-foreground)] opacity-20" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">No videos found</h3>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
