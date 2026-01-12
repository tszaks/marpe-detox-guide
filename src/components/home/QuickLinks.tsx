import { Calendar, Globe, Users, MessageSquare, Leaf, Pill, Star, HelpCircle, Video, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const links: { label: string; url: string; icon: LucideIcon; isInternal?: boolean }[] = [
  {
    label: 'Book an Appointment',
    url: 'https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa',
    icon: Calendar,
  },
  {
    label: 'Why Do A Detox?',
    url: 'https://www.marpenutrition.com/blog/2020/2/23/why-do-a-detox?rq=detox',
    icon: Leaf,
  },
  {
    label: 'Facebook Videos',
    url: 'https://www.facebook.com/MarpeNutrition',
    icon: Globe,
  },
  {
    label: 'Pinterest Recipes',
    url: 'https://www.pinterest.com/MarpeNutrition/detox-recipes/',
    icon: Pill, // Using Pill as placeholder for "Pin" or Recipe
  },
  {
    label: 'Video Library',
    url: '/videos',
    icon: Video,
    isInternal: true,
  },
  {
    label: 'Contact Us',
    url: 'https://www.marpenutrition.com/contact',
    icon: Phone,
  },
  {
    label: 'Share Feedback',
    url: 'https://tally.so/r/w21A0M',
    icon: MessageSquare,
  },
];

export function QuickLinks() {
  return (
    <section className="bg-[#f5f5f7] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-[12px] font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4 text-center">
            Ecosystem
          </h2>
          <p className="text-3xl font-bold text-[var(--foreground)] text-center tracking-tight sm:text-4xl">
            Everything you need.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target={link.isInternal ? undefined : '_blank'}
                rel={link.isInternal ? undefined : 'noopener noreferrer'}
                className="group flex flex-col items-center gap-4 rounded-[24px] bg-white p-6 text-center transition-all duration-300 hover:shadow-apple-hover hover:scale-[1.02] border border-[var(--border)]/30 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-cool)] group-hover:bg-[var(--brand-accent)]/10 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-[var(--brand-accent)]" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[14px] font-bold text-[var(--foreground)] tracking-tight leading-tight">{link.label}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
