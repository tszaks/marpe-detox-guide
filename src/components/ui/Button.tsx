import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary: 'bg-[var(--brand-accent)] text-white hover:opacity-90 shadow-sm',
      secondary: 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[#e8e8ed]',
      outline:
        'border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]',
      ghost: 'bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]',
    };

    const sizes = {
      sm: 'h-8 px-4 text-xs',
      md: 'h-10 px-6 text-sm',
      lg: 'h-12 px-8 text-base tracking-tight',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
