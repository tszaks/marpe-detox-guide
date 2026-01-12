import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getVideos, getVideoCategories } from '@/lib/videos';
import { VideoBrowser } from './VideoBrowser';

export const metadata: Metadata = {
  title: 'Video Library',
  description: 'Watch daily updates, recipes, and tips from our 2026 detox program.',
};

function VideoList() {
  const videos = getVideos();
  const categories = getVideoCategories();

  return <VideoBrowser videos={videos} categories={categories} />;
}

function VideoListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex gap-2 flex-wrap">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-white rounded-full animate-pulse border border-[var(--border)]/20" />
        ))}
      </div>
      <div className="h-14 bg-white rounded-full animate-pulse border border-[var(--border)]/20" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-video bg-white rounded-2xl animate-pulse border border-[var(--border)]/20" />
        ))}
      </div>
    </div>
  );
}

export default function VideosPage() {
  return (
    <div className="bg-[#fbfbfd] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-[12px] font-bold tracking-[0.2em] text-[var(--brand-accent)] uppercase mb-4 block">
            Visualization
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl mb-6">
            <span className="text-gradient">Detox</span>
            <br />
            <span className="green-gradient">Masterclass.</span>
          </h1>
          <p className="mt-8 text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-normal leading-relaxed">
            Follow along with Luisa Szakacs as she guides you through each day of the detox with 
            practical tips, delicious recipes, and encouragement.
          </p>
        </div>

        {/* Video browser */}
        <Suspense fallback={<VideoListSkeleton />}>
          <VideoList />
        </Suspense>
      </div>
    </div>
  );
}
