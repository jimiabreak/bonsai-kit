'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="relative z-50 bg-transparent py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="flex items-start justify-between max-w-[1512px] mx-auto">
        <Link
          href="/menu"
          className="font-sans text-brand-blue text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 w-[289px]"
        >
          Menu
        </Link>
        <Link
          href="/info"
          className="font-sans text-brand-blue text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 w-[289px] text-center"
        >
          Info
        </Link>
        <Link
          href="/subscription"
          className="font-sans text-brand-blue text-4xl md:text-5xl lg:text-[60px] tracking-[-0.06em] hover:opacity-70 transition-all duration-300 text-right whitespace-nowrap"
        >
          Order Online
        </Link>
      </nav>
    </motion.header>
  );
}
