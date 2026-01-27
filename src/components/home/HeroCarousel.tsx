import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroCarousel() {
  return (
    <section className="relative overflow-hidden bg-[#fbfbfd] pt-12 sm:pt-20 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center flex flex-col items-center justify-center">
          <div className="mb-4">
            <span className="rounded-full bg-[var(--brand-accent)]/10 px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[var(--brand-accent)] uppercase">
              January 2026
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-gradient">Welcome to the</span>
            <br />
            <span className="green-gradient">Marpé Nutrition Detox Guide!</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl">
            Your essential companion for the January 2026 Detox. Packed with recipes, tips, and support to make your journey easier and more effective.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
            <a
              href="#approved-foods"
              className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] bg-[var(--brand-accent)] text-white hover:opacity-90 shadow-apple px-10 py-4 text-lg hover:shadow-apple-hover"
            >
              View Food Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-[var(--brand-accent)]/5 px-8 py-3.5 text-base"
            >
              View Detox Recipes
            </Link>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--brand-accent)]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[var(--brand-accent)]/5 rounded-full blur-[80px]" />
      </div>
    </section>
  );
}
