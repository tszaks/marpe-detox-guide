'use client';

import { ReactNode, useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  className = '',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-[var(--border)]/30 rounded-[20px] overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-apple ${className}`}>
      <button
        type="button"
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-[var(--accent-cool)] transition-colors text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-bold tracking-tight text-[var(--foreground)]">{title}</span>
        <div className={`h-6 w-6 rounded-full bg-[var(--muted)] flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]' : 'text-[var(--muted-foreground)]'}`}>
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 border-t border-[var(--border)]/20 bg-[#fbfbfd]/50">
          {children}
        </div>
      </div>
    </div>
  );
}
