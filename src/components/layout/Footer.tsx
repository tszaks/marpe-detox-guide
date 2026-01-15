'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, ArrowRight } from 'lucide-react';

const quickLinks = [
  { name: 'Videos', href: '/videos' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Submit a Recipe', href: '/submit-recipe' },
  { name: 'Testimonials', href: '/testimonials' },
];

const externalLinks = [
  { name: 'Book a Session', href: 'https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa' },
  { name: 'MarpeNutrition.com', href: 'https://marpenutrition.com' },
];

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/nutritionbymarpe',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/marpenutrition/',
    icon: Instagram,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5f7] border-t border-[var(--border)]/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo.png"
              alt="Marpé Nutrition"
              width={140}
              height={44}
              className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <p className="mt-6 text-[14px] leading-relaxed text-[var(--muted-foreground)] max-w-sm">
              Helping you achieve your health goals through personalized nutrition guidance and 
              delicious, wholesome recipes. Your journey to wellness starts here.
            </p>
            <div className="mt-8 flex gap-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted-foreground)] hover:text-[var(--brand-accent)] transition-colors duration-300"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.1em] text-[var(--foreground)] uppercase mb-6">Explore</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-[var(--muted-foreground)] hover:text-[var(--brand-accent)] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-[12px] font-bold tracking-[0.1em] text-[var(--foreground)] uppercase mb-6">Resources</h3>
            <ul className="space-y-4">
              {externalLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] text-[var(--muted-foreground)] hover:text-[var(--brand-accent)] transition-colors duration-300"
                  >
                    {item.name}
                    <ArrowRight className="h-3 w-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border)]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-[var(--muted-foreground)]">
              &copy; {currentYear} Marpé Nutrition. All rights reserved.
            </p>
            <div className="flex gap-8 text-[12px] text-[var(--muted-foreground)]">
               <span className="hover:text-[var(--foreground)] transition-colors cursor-pointer">Privacy Policy</span>
               <span className="hover:text-[var(--foreground)] transition-colors cursor-pointer">Terms of Use</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
