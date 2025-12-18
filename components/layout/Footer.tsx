'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FooterProps {
  theme?: 'light' | 'dark';
}

export default function Footer({ theme = 'light' }: FooterProps) {
  const bgColor = theme === 'dark' ? 'bg-brand-blue' : 'bg-cream';
  const textColor = theme === 'dark' ? 'text-cream' : 'text-brand-blue';
  const logoSrc = theme === 'dark' ? '/images/Commonwealth_Logo_R-Cream.svg' : '/images/Commonwealth_Logo_R.svg';
  const cLogoSrc = theme === 'dark' ? '/images/Commonwealth_ORIG-C_WHITE.svg' : '/images/Commonwealth_ORIG-C_BLUE.svg';

  return (
    <motion.footer
      className={`relative z-50 ${bgColor} py-16 px-4 w-full overflow-x-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Footer Links */}
        <nav className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          <Link
            href="/contact"
            className={`font-sans ${textColor} text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300`}
          >
            Contact
          </Link>
          <Link
            href="/subscription"
            className={`font-sans ${textColor} text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300`}
          >
            Subscriptions
          </Link>
          <Link
            href="/gift-cards"
            className={`font-sans ${textColor} text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300`}
          >
            Gift Cards
          </Link>
          <Link
            href="/events"
            className={`font-sans ${textColor} text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300`}
          >
            Events
          </Link>
          <Link
            href="/faq"
            className={`font-sans ${textColor} text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300`}
          >
            FAQ
          </Link>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans ${textColor} text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300`}
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans ${textColor} text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300`}
          >
            Instagram
          </a>
        </nav>

        {/* Commonwealth Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src={logoSrc}
            alt="Commonwealth"
            width={680}
            height={136}
            className="h-auto max-w-[600px] md:max-w-[680px] w-full"
          />
        </div>

        {/* Bottom Row: Copyright, C Logo, Credit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
          {/* Copyright */}
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Image
              src={cLogoSrc}
              alt="©"
              width={24}
              height={24}
              className="h-5 w-5 md:h-6 md:w-6"
            />
            <p className={`text-sub-footer ${textColor}`}>
              2025. All rights reserved.
            </p>
          </div>

          {/* Center C Logo (hidden on mobile, shown on desktop) */}
          <div className="hidden md:flex justify-center">
            <Image
              src={cLogoSrc}
              alt="Commonwealth"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>

          {/* Shirakaba Studio Credit */}
          <div className="flex justify-center md:justify-end">
            <a
              href="https://www.shirakaba.studio"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sub-footer ${textColor} hover:opacity-70 transition-opacity duration-300`}
            >
              Site by Shirakaba Studio
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
