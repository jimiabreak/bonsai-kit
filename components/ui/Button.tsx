import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-light',
  secondary: 'bg-foreground text-background hover:opacity-90',
  outline: 'bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans uppercase tracking-wider transition-colors duration-200 min-h-touch'
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
