'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import ThemedHeader from "@/components/layout/ThemedHeader";

export default function Home() {
  return (
    <div className="relative overflow-hidden h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ThemedHeader theme="light" />
      </div>

      {/* Hero Content */}
      <div className="fixed inset-0 w-screen h-[100vh] min-h-[100dvh] bg-cream flex items-center justify-center overflow-hidden z-0">
        {/* Hero food image */}
        <motion.div
          className="relative w-full max-w-[480px] h-[600px] md:h-[641px]"
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

        {/* Commonwealth logo overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-[90%] md:max-w-[75%] lg:max-w-[1200px]">
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
      </div>

      {/* Footer - Homepage specific */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <motion.footer
          className="relative bg-transparent py-7 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <nav className="flex items-center justify-center gap-6 max-w-[1512px] mx-auto">
            <a href="/contact" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              Contact
            </a>
            <a href="/subscription" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              Subscriptions
            </a>
            <a href="/gift-cards" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              Gift Cards
            </a>
            <a href="/events" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              Events
            </a>
            <a href="/faq" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              FAQ
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              Instagram
            </a>
            <a href="/privacy" className="font-sans text-brand-blue text-xl tracking-[-0.01em] hover:opacity-70 transition-all duration-300 whitespace-nowrap">
              Privacy Policy
            </a>
          </nav>
        </motion.footer>
      </div>
    </div>
  );
}
