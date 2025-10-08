'use client';

import { ButtonProps } from '@/types';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  ariaLabel,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target';

  const variantStyles = {
    primary: 'bg-coffee-700 text-cream hover:bg-coffee-800 focus-visible:ring-coffee-700 active:bg-coffee-900',
    secondary: 'bg-cream-600 text-charcoal-900 hover:bg-cream-700 focus-visible:ring-cream-600 active:bg-cream-800',
    outline: 'border-2 border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-cream focus-visible:ring-charcoal-900 active:bg-charcoal-800',
    ghost: 'text-charcoal-900 hover:bg-cream-200 focus-visible:ring-charcoal-900 active:bg-cream-300',
    subscription: 'bg-cream border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-cream focus-visible:ring-brand-blue',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
    subscription: 'h-[61px] px-6 text-[1.563rem] tracking-[-0.02em] rounded-xl',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={combinedStyles}
    >
      {children}
    </button>
  );
}
