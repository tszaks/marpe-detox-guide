import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui';

const quickWins = [
  {
    initials: 'C',
    quote: 'I lost 16 pounds in 4 weeks!',
  },
  {
    initials: 'C',
    quote: 'I love getting a full night’s sleep now.',
  },
  {
    initials: 'C',
    quote: 'So thankful for healthy blood pressure levels.',
  },
  {
    initials: 'C',
    quote: 'I feel great! Everything feels amazing! I am going to keep it going.',
  },
];

export function QuickWinsPreview() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Wins & Testimonials
          </h2>
          <p className="mt-2 text-[var(--muted-foreground)]">
            See What Others Are Saying
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {quickWins.map((win, index) => (
            <div
              key={index}
              className="rounded-xl bg-[var(--accent-warm)] p-5 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white font-semibold text-sm">
                  {win.initials}
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-[var(--foreground)] italic">&ldquo;{win.quote}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/testimonials"
            className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)] h-10 px-6 text-sm"
          >
            Read Client Stories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
