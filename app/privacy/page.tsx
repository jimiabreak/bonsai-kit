'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="bg-cream min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <ThemedHeader theme="light" />

      {/* Hero Section */}
      <motion.div
        className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16"
        {...fadeInUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* C Logo */}
        <div className="flex justify-center mb-6 md:mb-8">
          <Image
            src="/images/c-logo.svg"
            alt="Commonwealth"
            width={33}
            height={42}
            className="w-[28px] h-[36px] md:w-[33px] md:h-[42px]"
          />
        </div>

        {/* Hero Text */}
        <h1 className="text-center text-brand-blue text-[2rem] sm:text-[2.5rem] md:text-[3.75rem] lg:text-[60px] tracking-[-0.06em] leading-tight mb-12 md:mb-16">
          Privacy Policy
        </h1>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-[900px] mx-auto px-4 md:px-8 mb-24 md:mb-32"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.2 : 0, ease: "easeOut" }}
      >
        <div className="space-y-8 text-brand-blue">
          {/* Last Updated */}
          <p className="text-[14px] md:text-[16px] italic">
            Last Updated: January 2025
          </p>

          {/* Introduction */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Introduction
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              Commonwealth Coffee (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              <p>
                <strong>Personal Information:</strong> When you subscribe to our coffee service or make a purchase, we collect information such as your name, email address, shipping address, and payment information through our secure payment processor.
              </p>
              <p>
                <strong>Automatically Collected Information:</strong> We collect certain information automatically when you visit our website, including your IP address, browser type, device information, and pages viewed.
              </p>
              <p>
                <strong>Cookies:</strong> We use cookies and similar technologies to enhance your browsing experience and analyze site traffic.
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Manage your subscription service</li>
                <li>Send you order confirmations and shipping updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Third-Party Services
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              We use Shopify to process payments and manage subscriptions. Your payment information is encrypted and securely transmitted to Shopify. We do not store your complete credit card information on our servers. Please review Shopify&apos;s Privacy Policy for more information on how they handle your data.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Data Security
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Your Rights
            </h2>
            <div className="space-y-4 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Manage your subscription preferences through our customer portal</li>
              </ul>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Changes to This Policy
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-4">
              Contact Us
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:
            </p>
            <div className="mt-4 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
              <p>Commonwealth Coffee</p>
              <p>Birmingham, Michigan</p>
              <p>Email: <a href="/contact" className="underline hover:opacity-70">Visit our contact page</a></p>
            </div>
          </section>
        </div>
      </motion.div>

      {/* Footer */}
      <Footer theme="light" />
    </div>
  );
}
