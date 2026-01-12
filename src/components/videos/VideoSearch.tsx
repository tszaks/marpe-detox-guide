'use client';

import { Search } from 'lucide-react';

interface VideoSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function VideoSearch({ onSearch, placeholder = 'Search videos...' }: VideoSearchProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
        <Search className="h-5 w-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--brand-accent)] transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full rounded-full border border-[var(--border)]/40 bg-white py-4 pl-12 pr-4 text-[15px] font-medium text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-accent)]/20 focus:outline-none focus:ring-4 focus:ring-[var(--brand-accent)]/5 transition-all shadow-sm"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
