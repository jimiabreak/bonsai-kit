'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';

export default function InfoPage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="bg-brand-blue min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <ThemedHeader theme="dark" />

      {/* Main Content Wrapper - matching Figma layout */}
      <div className="max-w-[1008px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-20 w-full">

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-16 md:mb-24 lg:mb-32 py-4 md:py-8 lg:py-12"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/images/main-logo-v2.svg"
            alt="Commonwealth Coffee"
            width={760}
            height={470}
            className="w-full max-w-[90%] md:max-w-[760px] h-auto"
            priority
          />
        </motion.div>

        {/* INFO and HOURS Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 mb-16 md:mb-20 lg:mb-32"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.2 : 0, ease: "easeOut" }}
        >
          {/* INFO Column */}
          <div className="text-cream">
            <h2 className="text-title mb-6 md:mb-8">INFO</h2>
            <div>
              <p className="text-body font-bold">Commonwealth Café</p>
              <p className="text-body">300 Hamilton Row</p>
              <p className="text-body mb-8">Birmingham, MI 48009</p>

              <a
                href="https://maps.google.com/?q=300+Hamilton+Row,+Birmingham,+MI+48009"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body underline hover:opacity-70 transition-opacity duration-300 mb-4"
              >
                Map
                <Image
                  src="/images/link-arrow.svg"
                  alt=""
                  width={29}
                  height={29}
                  className="w-[20px] h-[20px]"
                />
              </a>
              <br />
              <a
                href="tel:2487929766"
                className="inline-flex items-center gap-2 text-body underline hover:opacity-70 transition-opacity duration-300 mt-4"
              >
                (248) 792-9766
                <Image
                  src="/images/link-arrow.svg"
                  alt=""
                  width={29}
                  height={29}
                  className="w-[20px] h-[20px]"
                />
              </a>
            </div>
          </div>

          {/* HOURS Column */}
          <div className="text-cream">
            <h2 className="text-title mb-6 md:mb-8 md:text-right">HOURS</h2>
            <div className="flex justify-between max-w-[500px] w-full">
              <div className="space-y-1">
                <p className="text-body">Mon</p>
                <p className="text-body">Tue</p>
                <p className="text-body">Wed</p>
                <p className="text-body">Thu</p>
                <p className="text-body">Fri</p>
                <p className="text-body">Sat</p>
                <p className="text-body">Sun</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-body">7:30 AM - 3:00 PM</p>
                <p className="text-body">7:30 AM - 3:00 PM</p>
                <p className="text-body">7:30 AM - 3:00 PM</p>
                <p className="text-body">7:30 AM - 3:00 PM</p>
                <p className="text-body">7:30 AM - 3:00 PM</p>
                <p className="text-body">7:30 AM - 3:00 PM</p>
                <p className="text-body">7:30 AM - 3:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* No Reservations Text */}
        <motion.div
          className="text-center text-cream mb-24 md:mb-32 lg:mb-40 xl:mb-52 px-4"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.4 : 0, ease: "easeOut" }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] leading-tight tracking-[-0.06em]">
            NO RESERVATIONS.
            <br />
            WALK IN OR TAKEOUT ONLY.
          </p>
        </motion.div>

        {/* MENU Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 mb-24 md:mb-32 lg:mb-40 xl:mb-52"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.5 : 0, ease: "easeOut" }}
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 group"
          >
            <h2 className="menu-large-link text-cream underline hover:opacity-70 transition-opacity duration-300">
              MENU
            </h2>
            <Image
              src="/images/link-arrow.svg"
              alt=""
              width={29}
              height={29}
              className="w-[20px] h-[20px] md:w-[29px] md:h-[29px]"
            />
          </Link>
          <div className="text-cream md:text-right">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] leading-tight tracking-[-0.06em]">
              OUR ALL-DAY MENU
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] leading-tight tracking-[-0.06em]">
              SERVED EVERY DAY.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Food Images - Full Width */}
      <motion.div
        className="px-5 space-y-4 mb-20"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.6 : 0, ease: "easeOut" }}
      >
        {/* Large Image */}
        <div className="relative w-full h-[400px] md:h-[740px] rounded-sm overflow-hidden">
          <Image
            src="/images/food-1.png"
            alt="Commonwealth Coffee food"
            fill
            className="object-cover"
          />
        </div>

        {/* Two Smaller Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full h-[400px] md:h-[831px] rounded-sm overflow-hidden">
            <Image
              src="/images/food-1.png"
              alt="Commonwealth Coffee food"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[400px] md:h-[831px] rounded-sm overflow-hidden">
            <Image
              src="/images/food-2.png"
              alt="Commonwealth Coffee food"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Footer Section - Cream Background */}
      <motion.div
        className="bg-cream py-16 px-4 w-full overflow-x-hidden"
        initial={{ opacity: !prefersReducedMotion ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.8 : 0, ease: "easeOut" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Footer Links */}
          <nav className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            <Link href="/contact" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Contact
            </Link>
            <Link href="/subscription" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Subscriptions
            </Link>
            <Link href="/gift-cards" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Gift Cards
            </Link>
            <Link href="/events" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Events
            </Link>
            <Link href="/faq" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              FAQ
            </Link>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Instagram
            </a>
            <Link href="/privacy" className="font-sans text-base md:text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Privacy Policy
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sub-footer text-brand-blue text-center">
            © 2025. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
