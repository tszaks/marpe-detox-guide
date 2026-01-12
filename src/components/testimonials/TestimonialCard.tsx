import { Star } from 'lucide-react';

interface TestimonialCardProps {
  initials: string;
  quote: string;
  isQuickWin?: boolean;
}

export function TestimonialCard({ initials, quote, isQuickWin = false }: TestimonialCardProps) {
  return (
    <div
      className={`rounded-xl p-6 ${
        isQuickWin
          ? 'bg-[var(--accent-warm)] border border-amber-100'
          : 'bg-white border border-[var(--border)] shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-semibold ${
            isQuickWin
              ? 'bg-amber-500 text-white'
              : 'bg-[var(--brand-primary)] text-white'
          }`}
        >
          {initials}
        </div>
        <div className="flex-1">
          {/* Star rating */}
          <div className={`flex mb-2 ${isQuickWin ? 'text-amber-400' : 'text-yellow-400'}`}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="text-[var(--foreground)] italic">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
}
