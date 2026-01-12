'use client';

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

  const isFacebook = !!video.facebookUrl;
  
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[var(--border)]/40 shadow-sm transition-all duration-300 hover:shadow-apple-hover hover:scale-[1.02]"
    >
      {/* Thumbnail placeholder */}
      <div className="relative aspect-video bg-[var(--accent-cool)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center text-[var(--brand-accent)] shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
          <Play className="h-6 w-6 fill-current" />
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
