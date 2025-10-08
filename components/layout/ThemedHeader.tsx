'use client';

import Link from 'next/link';

interface ThemedHeaderProps {
  theme?: 'light' | 'dark';
}

export default function ThemedHeader({ theme = 'light' }: ThemedHeaderProps) {
  const textColor = theme === 'light' ? 'text-brand-blue' : 'text-cream';

  return (
    <header className="relative z-50 bg-transparent py-1 px-4">
      <nav className="flex items-start justify-between max-w-[1512px] mx-auto">
        <Link
          href="/"
          className={`font-sans ${textColor} text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 w-[289px]`}
        >
          Home
        </Link>
        <Link
          href="/menu"
          className={`font-sans ${textColor} text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 w-[289px] text-center`}
        >
          Menu
        </Link>
        <Link
          href="/subscription"
          className={`font-sans ${textColor} text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 text-right whitespace-nowrap`}
        >
          Order Online
        </Link>
      </nav>
    </header>
  );
}
