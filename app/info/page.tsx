'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';

export default function InfoPage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="bg-brand-blue min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#152885' }}>
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
            src="/images/main-logo-V2.svg"
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
          <div className="text-cream text-center md:text-left">
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
            <h2 className="text-title mb-6 md:mb-8 text-center md:text-right">HOURS</h2>
            <div className="flex justify-between max-w-[500px] w-full mx-auto md:mx-0 md:ml-auto">
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
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] leading-[1.4] md:leading-[1.3] tracking-[-0.06em]">
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
            className="inline-flex items-center justify-center md:justify-start gap-3 group"
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
          <div className="text-cream text-center md:text-right max-w-[600px] md:max-w-none mx-auto md:mx-0">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] leading-[1.4] md:leading-[1.3] tracking-[-0.06em] whitespace-nowrap">
              OUR ALL-DAY MENU.
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] leading-[1.4] md:leading-[1.3] tracking-[-0.06em] whitespace-nowrap">
              SERVED EVERY DAY.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Food Images - Full Width */}
      <motion.div
        className="px-5 mb-20"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.6 : 0, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Image - Cinnamon Rolls */}
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/images/0A925E52-AF1F-422C-A875-F7A617523660-1-1.jpg"
              alt="Commonwealth Coffee pastries"
              fill
              className="object-cover"
            />
          </div>

          {/* Second Image - Bowl Dish */}
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/images/IwerwMG_5035.jpg"
              alt="Commonwealth Coffee food"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <Footer theme="dark" />
    </div>
  );
}
