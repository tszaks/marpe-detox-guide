'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  badge?: string;
  heading: React.ReactNode;
  description: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

const slides: Slide[] = [
  {
    badge: 'January 2026',
    heading: (
      <>
        <span className="text-gradient">Welcome to the</span>
        <br />
        <span className="green-gradient">Marpé Nutrition Detox Guide!</span>
      </>
    ),
    description:
      'Your essential companion for the January 2026 Detox. Packed with recipes, tips, and support to make your journey easier and more effective.',
    cta: { label: 'View Food Plan', href: '#approved-foods' },
    secondaryCta: { label: 'View Detox Recipes', href: '/recipes' },
  },
  {
    badge: 'Services',
    heading: (
      <>
        <span className="text-gradient">Holistic Wellness</span>
        <br />
        <span className="green-gradient">Solutions</span>
      </>
    ),
    description:
      'Nutrition Response Testing, Health Coaching, Emotion Code, BEMER Therapy, ZYTO Scans, Healy Frequency, and Quantum Testing — all under one roof.',
    cta: {
      label: 'Learn More',
      href: 'https://www.marpenutrition.com',
      external: true,
    },
    secondaryCta: {
      label: 'Book a Session',
      href: 'https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa',
      external: true,
    },
  },
  {
    badge: 'Testimonial',
    heading: (
      <>
        <span className="text-gradient">&ldquo;I lost 16 pounds</span>
        <br />
        <span className="green-gradient">in just 4 weeks!&rdquo;</span>
      </>
    ),
    description:
      'Real results from real clients. Our detox program helps you feel lighter, sleep better, and regain your energy naturally.',
    cta: { label: 'Read More Stories', href: '/testimonials' },
  },
  {
    badge: 'Get Started',
    heading: (
      <>
        <span className="text-gradient">Ready to Feel</span>
        <br />
        <span className="green-gradient">Your Best?</span>
      </>
    ),
    description:
      'Book your appointment today and take the first step toward a healthier you. Located in Phoenixville, PA.',
    cta: {
      label: 'Book Now',
      href: 'https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa',
      external: true,
    },
    secondaryCta: { label: 'Call 215-450-8745', href: 'tel:2154508745' },
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#fbfbfd] pt-12 sm:pt-20 pb-16 sm:pb-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center relative min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
                index === activeIndex
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              {slide.badge && (
                <div className="mb-4">
                  <span className="rounded-full bg-[var(--brand-accent)]/10 px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[var(--brand-accent)] uppercase">
                    {slide.badge}
                  </span>
                </div>
              )}

              <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl xl:text-7xl">
                {slide.heading}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl">
                {slide.description}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
                {slide.cta.external ? (
                  <a
                    href={slide.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] bg-[var(--brand-accent)] text-white hover:opacity-90 shadow-apple px-10 py-4 text-lg hover:shadow-apple-hover"
                  >
                    {slide.cta.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                ) : (
                  <a
                    href={slide.cta.href}
                    className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] bg-[var(--brand-accent)] text-white hover:opacity-90 shadow-apple px-10 py-4 text-lg hover:shadow-apple-hover"
                  >
                    {slide.cta.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                )}
                {slide.secondaryCta &&
                  (slide.secondaryCta.external ? (
                    <a
                      href={slide.secondaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-[var(--brand-accent)]/5 px-8 py-3.5 text-base"
                    >
                      {slide.secondaryCta.label}
                    </a>
                  ) : (
                    <Link
                      href={slide.secondaryCta.href}
                      className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-[var(--brand-accent)]/5 px-8 py-3.5 text-base"
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-[var(--brand-accent)]'
                  : 'w-2.5 bg-[var(--brand-accent)]/25 hover:bg-[var(--brand-accent)]/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow buttons (appear on hover) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 shadow-apple flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 sm:left-8"
      >
        <ChevronLeft className="h-5 w-5 text-[var(--foreground)]" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 shadow-apple flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 sm:right-8"
      >
        <ChevronRight className="h-5 w-5 text-[var(--foreground)]" />
      </button>

      {/* Background blobs (consistent across all slides) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--brand-accent)]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[var(--brand-accent)]/5 rounded-full blur-[80px]" />
      </div>
    </section>
  );
}
