'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ExternalLink, Menu, X, Youtube } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Videos', href: '/videos' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Submit Recipe', href: '/submit-recipe' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Share Your Story', href: '/submit-testimonial' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border)]/30 transition-all duration-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between sm:h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Marpé Nutrition"
              width={140}
              height={44}
              className="h-7 w-auto sm:h-8"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8 xl:gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[12px] font-normal tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors uppercase whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-2">
              <a
                href="https://www.youtube.com/@luisaszakacs4371"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-4 py-1.5 text-[12px] font-medium text-white hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-[var(--foreground)] hover:bg-[var(--muted)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[var(--border)]/30 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@luisaszakacs4371"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://square.site/book/4ZA2H8192GMMS/marpe-nutrition-phoenixville-pa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-4 py-3 text-sm font-medium text-white shadow-sm active:scale-[0.98] transition-transform"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
