'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';
import FAQAccordion from '@/components/ui/FAQAccordion';

const faqData = [
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
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="bg-brand-blue min-h-screen" style={{ backgroundColor: '#152885' }}>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <FAQAccordion
            theme="dark"
            items={faqData}
            defaultOpenIndexes={[0]}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer theme="dark" />
      </div>
    </div>
  );
}
