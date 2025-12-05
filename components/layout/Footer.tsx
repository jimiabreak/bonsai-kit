'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="relative z-50 bg-cream py-16 px-4 w-full overflow-x-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Footer Links */}
        <nav className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-6 mb-12">
          <Link
            href="/contact"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            Contact
          </Link>
          <Link
            href="/subscription"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            Subscriptions
          </Link>
          <Link
            href="/gift-cards"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            Gift Cards
          </Link>
          <Link
            href="/events"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            Events
          </Link>
          <Link
            href="/faq"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            FAQ
          </Link>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            Instagram
          </a>
          <Link
            href="/privacy"
            className="font-sans text-brand-blue text-base md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300"
          >
            Privacy Policy
          </Link>
        </nav>

        {/* Commonwealth Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Commonwealth_Logo_R.svg"
            alt="Commonwealth"
            width={500}
            height={100}
            className="h-auto max-w-[500px] w-full"
          />
        </div>

        {/* Small C Logo and Copyright */}
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/images/c-small.svg"
            alt="©"
            width={12}
            height={12}
            className="h-3 w-auto"
          />
          <p className="text-sub-footer text-brand-blue">
            2025. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
