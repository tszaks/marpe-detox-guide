import { Droplets, Ban, FlaskConical, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const tips: { icon: LucideIcon; title: string; description: string; link?: string }[] = [
  {
    icon: Ban,
    title: 'No Air Fresheners',
    description: 'Eliminate artificial fragrances from your environment.',
  },
  {
    icon: FlaskConical,
    title: 'Avoid Unhealthy Cleaning Chemicals',
    description: 'Switch to natural cleaning products to reduce toxic load.',
  },
  {
    icon: XCircle,
    title: 'Avoid Aluminum Foil & Tin',
    description: 'Use glass or stainless steel for food storage and cooking.',
  },
  {
    icon: Droplets,
    title: 'Drink Healthy Water',
    description: 'Hydration is key. Click to watch the video on healthy water.',
    link: 'https://www.facebook.com/reel/237565766066553',
  },
];

export function TipsAndReminders() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Things to Remember While Detoxing
          </h2>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Important guidelines for a successful detox
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip) => {
            const Icon = tip.icon;
            const content = (
              <div className="flex items-start gap-4 h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-cool)] flex-shrink-0">
                  <Icon className="h-5 w-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{tip.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{tip.description}</p>
                </div>
              </div>
            );

            if (tip.link) {
              return (
                <a
                  key={tip.title}
                  href={tip.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--border)] bg-white p-6 transition-all hover:shadow-md block"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={tip.title}
                className="rounded-xl border border-[var(--border)] bg-white p-6 transition-all hover:shadow-md"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
