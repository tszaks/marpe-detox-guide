import { ReactNode } from 'react';
import { Info, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  variant?: 'info' | 'success' | 'warning' | 'tip';
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({ variant = 'info', title, children, className = '' }: CalloutProps) {
  const variants = {
    info: {
      bg: 'bg-[#fbfbfd]',
      border: 'border-[var(--border)]/40',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      titleColor: 'text-[var(--foreground)]',
      textColor: 'text-[var(--muted-foreground)]',
    },
    success: {
      bg: 'bg-[var(--accent-cool)]',
      border: 'border-[var(--brand-accent)]/10',
      icon: <CheckCircle2 className="h-5 w-5 text-[var(--brand-accent)]" />,
      titleColor: 'text-[var(--brand-accent)]',
      textColor: 'text-[var(--brand-accent)]/80',
    },
    warning: {
      bg: 'bg-[var(--accent-warm)]',
      border: 'border-amber-200/50',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      titleColor: 'text-amber-900',
      textColor: 'text-amber-800/80',
    },
    tip: {
      bg: 'bg-indigo-50/30',
      border: 'border-indigo-100',
      icon: <Lightbulb className="h-5 w-5 text-indigo-500" />,
      titleColor: 'text-indigo-900',
      textColor: 'text-indigo-800/80',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`rounded-2xl border ${style.bg} ${style.border} p-6 shadow-sm ${className}`}
      role="alert"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 pt-0.5" aria-hidden="true">
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`text-[15px] font-bold tracking-tight ${style.titleColor} mb-1`}>{title}</h4>
          )}
          <div className={`text-[14px] leading-relaxed ${style.textColor}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
