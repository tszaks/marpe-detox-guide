'use client';

import Image from 'next/image';
import { Play, Clock } from 'lucide-react';
import type { Video } from '@/types';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  // Prefer Facebook URL if available, otherwise fall back to YouTube playlist
  const videoUrl = video.facebookUrl
    ? video.facebookUrl
    : video.youtubeId
      ? `https://www.youtube.com/watch?list=${video.youtubeId}${video.index ? `&index=${video.index}` : ''}`
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

        {/* Recent badge */}
        {video.isRecent && (
          <div className="absolute top-3 right-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm animate-pulse">
            New
          </div>
        )}

        {/* Featured/Pinned badge */}
        {video.isPinned && (
          <div className="absolute top-3 right-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-bold leading-tight text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
          {video.title}
        </h3>

        {video.day && (
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-[var(--brand-accent)]/10 px-2.5 py-0.5 text-[11px] font-bold text-[var(--brand-accent)]">
              Day {video.day}
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
