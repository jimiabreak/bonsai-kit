'use client';

import Link from 'next/link';

interface ThemedHeaderProps {
  theme?: 'light' | 'dark';
}

export default function ThemedHeader({ theme = 'light' }: ThemedHeaderProps) {
  const textColor = theme === 'light' ? 'text-brand-blue' : 'text-cream';

  return (
    <header className="relative z-50 bg-transparent py-1 px-4">
      <nav className="grid grid-cols-3 items-start max-w-[1512px] mx-auto">
        <Link
          href="/info"
          className={`font-sans ${textColor} text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 text-left`}
        >
          Info
        </Link>
        <Link
          href="/menu"
          className={`font-sans ${textColor} text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 text-center`}
        >
          Menu
        </Link>
        <a
          href="https://order.spoton.com/so-commonwealth-cafe-53/birmingham-mi/5ec45f979adef31aa78c2002/"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-sans ${textColor} text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 text-right whitespace-nowrap`}
        >
          Order Now
        </a>
      </nav>
    </header>
  );
}
