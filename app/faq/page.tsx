'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "WHAT MAKES COMMONWEALTH COFFEE SPECIAL?",
    answer: "At Commonwealth, coffee isn't just a drink—it's a craft. We've been roasting our own coffee beans in-house since 2010, refining our process to bring out the best in every bean. From El Salvador to Ethiopia we source the highest-quality green coffee beans from around the world, selecting them based on peak growing seasons for optimal flavor. Every bean is roasted to a perfect medium roast, designed to highlight the unique nuances of each origin and blend.\n\nOur expert baristas are dedicated to maintaining the integrity of every brew, ensuring that each cup meets the highest standards. We also take pride in our ingredients, using only the best locally sourced milk and crafting all of our house-made syrups with premium ingredients—no shortcuts, just exceptional quality."
  },
  {
    question: "DO YOU OFFER DAIRY-FREE ALTERNATIVES?",
    answer: "Yes! We offer a variety of dairy-free milk alternatives including oat milk, almond milk, and soy milk. All of our alternative milks are carefully selected to complement our coffee perfectly."
  },
  {
    question: "CAN I ORDER AHEAD?",
    answer: "Absolutely! You can order ahead through our online ordering system for pickup. We don't take reservations for dine-in, but walk-ins and takeout orders are always welcome."
  },
  {
    question: "DO YOU HAVE GLUTEN-FREE OPTIONS?",
    answer: "Yes, we offer several gluten-free food options including our gluten-free bread for sandwiches and a selection of gluten-free pastries. Please ask our staff for current availability."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="bg-brand-blue min-h-screen">
      {/* Header */}
      <ThemedHeader theme="dark" />

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-20">

        {/* FAQ Title */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-cream text-[120px] md:text-[180px] lg:text-[240px] font-sans font-normal leading-none tracking-tight">
            FAQ
          </h1>
        </motion.div>

        {/* Accordion Items */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-cream/30"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-6 flex items-center justify-between gap-4 text-cream hover:opacity-70 transition-opacity duration-300"
                aria-expanded={openIndex === index}
              >
                <h2 className="text-[1.875rem] font-bold leading-tight tracking-[-0.03em] pr-8">
                  {item.question}
                </h2>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex-shrink-0"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false} mode="wait">
                {openIndex === index && (
                  <motion.div
                    key={`answer-${index}`}
                    initial={{ height: 0 }}
                    animate={{
                      height: "auto",
                      transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    }}
                    exit={{
                      height: 0,
                      transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 0.2,
                          delay: 0.1
                        }
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.15
                        }
                      }}
                      className="pb-6 text-cream whitespace-pre-line"
                    >
                      <p className="text-[1.063rem] leading-relaxed tracking-[-0.01em]">
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Section - Cream Background */}
      <motion.div
        className="bg-cream py-16 px-4 mt-20"
        initial={{ opacity: !prefersReducedMotion ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.4 : 0, ease: "easeOut" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Footer Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <a href="/contact" className="font-sans text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Contact
            </a>
            <a href="/gift-cards" className="font-sans text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Gift Cards
            </a>
            <a href="/events" className="font-sans text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Events
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-sans text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-sans text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Instagram
            </a>
            <a href="/privacy" className="font-sans text-xl text-brand-blue tracking-[-0.01em] hover:opacity-70 transition-opacity duration-300">
              Privacy Policy
            </a>
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
