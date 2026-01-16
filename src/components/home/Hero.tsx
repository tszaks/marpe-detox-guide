import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfbfd] pt-16 sm:pt-24 pb-20 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-4 flex justify-center opacity-0 animate-[fade-in_1s_ease-out_forwards]">
            <span className="rounded-full bg-[var(--brand-accent)]/10 px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[var(--brand-accent)] uppercase">
              January 2026
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl xl:text-7xl opacity-0 animate-[slide-up_1s_ease-out_forwards]">
            <span className="text-gradient">Welcome to the</span>
            <br />
            <span className="green-gradient">Marpé Nutrition Detox Guide!</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-normal leading-relaxed text-[var(--muted-foreground)] opacity-0 animate-[slide-up_1s_ease-out_0.2s_forwards] sm:text-xl">
            Your essential companion for the January 2026 Detox. Packed with recipes, tips, and support to make your journey easier and more effective. Check back often for new updates!
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 opacity-0 animate-[slide-up_1s_ease-out_0.4s_forwards] sm:flex-row sm:gap-4">
            <a
              href="#approved-foods"
              className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 bg-[var(--brand-accent)] text-white hover:opacity-90 shadow-apple px-10 py-7 text-lg hover:shadow-apple-hover"
            >
              View Food Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-[var(--brand-accent)]/5 px-8 py-6 text-base"
            >
              View Detox Recipes
            </Link>
          </div>
          <div className="mt-6 opacity-0 animate-[slide-up_1s_ease-out_0.5s_forwards]">
            <a href="#foods-to-avoid" className="text-sm font-medium text-[var(--brand-accent)] hover:underline underline-offset-4 transition-all">
              Foods Not Included in This Reset
            </a>
          </div>
        </div>
      </div>
      
      {/* Abstract background elements for a premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--brand-accent)]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[var(--brand-accent)]/5 rounded-full blur-[80px]" />
      </div>
    </section>
  );
}
