'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';

export default function EventsPage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="bg-cream min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <ThemedHeader theme="light" />

      {/* Main Content Wrapper */}
      <div className="max-w-[1512px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 w-full">

        {/* Hero Section - Events header, description, and CCC logo */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Left Column - Events Info */}
          <div className="text-brand-blue text-center md:text-left">
            <h1 className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] font-normal tracking-[-0.06em] leading-tight mb-4 md:mb-6">
              Events
            </h1>
            <p className="text-[18px] sm:text-[20px] md:text-[24px] leading-relaxed mb-4">
              For more information on private events and catering please contact us at
            </p>
            <a
              href="mailto:events@gocommonwealth.com?subject=Commonwealth%20Event"
              className="inline-flex items-center gap-2 text-[18px] sm:text-[20px] md:text-[24px] underline hover:opacity-70 transition-opacity duration-300"
            >
              events@gocommonwealth.com
              <Image
                src="/images/light-arrow.svg"
                alt=""
                width={29}
                height={29}
                className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
              />
            </a>
          </div>

          {/* Right Column - CCC Logo */}
          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="/images/Commonwealth_CCC_Blue.svg"
              alt="Commonwealth CCC"
              width={300}
              height={100}
              className="w-full max-w-[200px] md:max-w-[300px] h-auto"
            />
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] mb-12 md:mb-20 rounded-sm overflow-hidden"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.2 : 0, ease: "easeOut" }}
        >
          <Image
            src="/images/events-hero.jpg"
            alt="Commonwealth Coffee events"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1512px"
          />
        </motion.div>

        {/* Host your event text */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.3 : 0, ease: "easeOut" }}
        >
          <h2 className="text-brand-blue text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] tracking-[-0.06em] leading-tight">
            Host your event at Commonwealth
            <br />
            or we&apos;ll bring our food to you.
          </h2>
        </motion.div>

        {/* Two Options Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start mb-16 md:mb-20"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.4 : 0, ease: "easeOut" }}
        >
          {/* Option 1: At the Café */}
          <div className="space-y-4 text-center md:text-left">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-sm overflow-hidden">
              <Image
                src="/images/new-Cafe-Event-2-1.jpg"
                alt="Events at Commonwealth Café"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <h3 className="text-brand-blue text-[24px] sm:text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              At the Café
            </h3>
            <p className="text-brand-blue text-[18px] sm:text-[20px] md:text-[24px] leading-relaxed">
              Host your event
              <br />
              at Commonwealth.
            </p>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center md:py-24">
            <div className="text-brand-blue text-[32px] sm:text-[40px] md:text-[48px] font-bold">
              OR
            </div>
          </div>

          {/* Option 2: We come to you */}
          <div className="space-y-4 text-center md:text-left">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-sm overflow-hidden">
              <Image
                src="/images/IMG_9768-1.jpg"
                alt="Commonwealth Catering"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <h3 className="text-brand-blue text-[24px] sm:text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              We come to you.
            </h3>
            <p className="text-brand-blue text-[18px] sm:text-[20px] md:text-[24px] leading-relaxed">
              Bring Commonwealth
              <br />
              to your next event.
            </p>
          </div>
        </motion.div>

        {/* Contact Email Link */}
        <motion.div
          className="flex justify-center mb-20 md:mb-24"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.5 : 0, ease: "easeOut" }}
        >
          <a
            href="mailto:events@gocommonwealth.com?subject=Commonwealth%20Event%20Inquiry"
            className="inline-flex items-center gap-2 text-brand-blue text-[20px] sm:text-[24px] md:text-[28px] underline hover:opacity-70 transition-opacity duration-300"
          >
            events@gocommonwealth.com
            <Image
              src="/images/light-arrow.svg"
              alt=""
              width={29}
              height={29}
              className="w-[24px] h-[24px] md:w-[29px] md:h-[29px]"
            />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer theme="light" />
    </div>
  );
}
