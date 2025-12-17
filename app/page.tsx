'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import ThemedHeader from "@/components/layout/ThemedHeader";

export default function Home() {
  return (
    <div className="relative bg-cream w-full min-h-screen">
      {/* Header - Mobile: absolute, Desktop: fixed */}
      <div className="absolute md:fixed top-0 left-0 right-0 z-50 w-full">
        <ThemedHeader theme="light" />
      </div>

      {/* Hero Content - Mobile: scrollable column, Desktop: fixed centered */}
      <div className="w-full min-h-screen md:h-screen flex flex-col md:flex-row md:items-center md:justify-center px-4 pt-32 pb-8 md:pt-0 md:pb-0 md:px-0">
        {/* Commonwealth logo - Mobile: above image, Desktop: overlay */}
        <motion.div
          className="w-full max-w-[90%] mx-auto mb-8 md:absolute md:inset-0 md:flex md:items-center md:justify-center md:pointer-events-none md:mb-0 md:px-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative w-full md:max-w-[75%] lg:max-w-[1200px]">
            <Image
              src="/images/Commonwealth_Logo_R.svg"
              alt="Commonwealth Coffee"
              width={1200}
              height={200}
              className="w-full h-auto"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </motion.div>

        {/* Hero food image */}
        <motion.div
          className="relative w-full max-w-[480px] mx-auto h-[500px] md:h-[641px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/images/hero-food.png"
            alt="Commonwealth Coffee food and drinks"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </motion.div>
      </div>

      {/* Footer - Mobile: static below image, Desktop: fixed bottom */}
      <div className="relative md:fixed md:bottom-0 md:left-0 md:right-0 z-50 w-full">
        <motion.footer
          className="relative bg-transparent py-8 md:py-7 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <nav className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-6 max-w-[1512px] mx-auto">
            <a href="/contact" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              Contact
            </a>
            <a href="/subscription" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              Subscriptions
            </a>
            <a href="/gift-cards" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              Gift Cards
            </a>
            <a href="/events" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              Events
            </a>
            <a href="/faq" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              FAQ
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              Instagram
            </a>
            <a href="/privacy" className="font-sans text-brand-blue text-xl md:text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300">
              Privacy Policy
            </a>
          </nav>
        </motion.footer>
      </div>
    </div>
  );
}
