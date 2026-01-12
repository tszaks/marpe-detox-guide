import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Callout } from '@/components/ui';

export function Announcements() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Detox Joining Announcement */}
          <Callout variant="info" title="Join Us for Detox!">
            <p>
              Are you joining us for Detox this January? Make your appointment today!
            </p>
            <a
              href="https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-[13px] font-bold text-[var(--foreground)] hover:text-[var(--brand-accent)] transition-colors"
            >
              Book an Appointment
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Callout>

          {/* Recipe Contest Announcement */}
          <Callout variant="success" title="Detox Recipe Contest!">
            <p>
              This year, we’re running the recipe contest! If you submit a recipe, you are entered to win a $100 Marpé gift card.
            </p>
            <a
              href="https://tally.so/r/7RKXd2"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-[13px] font-bold text-[var(--brand-accent)] hover:opacity-80 transition-opacity"
            >
              Submit a Recipe
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Callout>
        </div>
      </div>
    </section>
  );
}
