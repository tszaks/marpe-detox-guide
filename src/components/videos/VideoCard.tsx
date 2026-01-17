'use client';

import Image from 'next/image';
import { Play, Clock } from 'lucide-react';
import type { Video } from '@/types';

// Format YYYYMMDD → "January 16, 2026"
function formatUploadDate(dateStr?: string): string {
  if (!dateStr || dateStr.length !== 8) return '';
  const year = dateStr.slice(0, 4);
  const month = parseInt(dateStr.slice(4, 6), 10) - 1;
  const day = parseInt(dateStr.slice(6, 8), 10);
  const date = new Date(parseInt(year), month, day);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  // Prefer Facebook URL if available, otherwise fall back to YouTube
  const videoUrl = video.facebookUrl
    ? video.facebookUrl
    : video.youtubeId
      ? video.index
        ? `https://www.youtube.com/watch?list=${video.youtubeId}&index=${video.index}`
        : `https://www.youtube.com/watch?v=${video.youtubeId}`
      : '#';

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[var(--border)]/40 shadow-sm transition-all duration-300 hover:shadow-apple-hover hover:scale-[1.02]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[var(--accent-cool)] flex items-center justify-center overflow-hidden">
        {video.thumbnailUrl && (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover object-[center_25%] transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="h-14 w-14 rounded-full bg-white/95 flex items-center justify-center text-[var(--brand-accent)] shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
          <Play className="h-7 w-7 fill-current ml-1" />
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {video.duration}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[var(--brand-accent)] uppercase tracking-wider shadow-sm">
          {video.category}
        </div>

        {/* Top right badge: Featured > Day > Non-Detox */}
        {video.isPinned ? (
          <div className="absolute top-3 right-3 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
            Featured
          </div>
        ) : video.day ? (
          <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[var(--brand-primary)] uppercase tracking-wider shadow-sm">
            Day {video.day}
          </div>
        ) : video.isArchived && (
          <div className="absolute top-3 right-3 rounded-full bg-gray-500/80 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
            Non-Detox
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-bold leading-tight text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
          {video.title}
        </h3>

        {/* Upload date - always shown */}
        {video.uploadDate && (
          <p className="mt-2 text-[12px] text-[var(--muted-foreground)]">
            {formatUploadDate(video.uploadDate)}
          </p>
        )}
      </div>
    </a>
  );
}
