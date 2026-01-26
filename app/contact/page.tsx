'use client';

import { useState } from 'react';
import Script from 'next/script';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get reCAPTCHA v3 token
      let recaptchaToken = '';
      if (window.grecaptcha) {
        console.log('[Contact Form] grecaptcha available, getting token...');
        await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));
        recaptchaToken = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action: 'contact_form' }
        );
        console.log('[Contact Form] Token obtained:', recaptchaToken ? 'yes' : 'no');
      } else {
        console.warn('[Contact Form] grecaptcha not available - script may not have loaded');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ "--background": "#152885" } as React.CSSProperties} className="min-h-[100dvh] w-full overflow-x-hidden bg-[var(--background)]">
      {/* reCAPTCHA v3 Script */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      {/* Header */}
      <ThemedHeader theme="dark" />

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-20">

        {/* Contact Title */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-cream text-[80px] sm:text-[120px] md:text-[180px] lg:text-[240px] font-sans font-normal leading-none tracking-tight">
            CONTACT
          </h1>
        </motion.div>

        {/* Wholesale Text */}
        <motion.div
          className="text-center mb-12"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.2 : 0, ease: "easeOut" }}
        >
          <h2 className="text-cream text-[2.5rem] md:text-[3rem] font-bold tracking-tight mb-4">
            COMMONWEALTH COFFEE ROASTER
          </h2>
          <p className="text-cream text-[1.5rem] md:text-[2rem] leading-relaxed max-w-[900px] mx-auto">
            If you are interested in wholesale or becoming a vendor, please reach out to us at{' '}
            <a
              href="mailto:coffee@gocommonwealth.com"
              className="underline hover:opacity-70 transition-opacity duration-300"
            >
              coffee@gocommonwealth.com
            </a>
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-[1200px] mx-auto mt-16"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.3 : 0, ease: "easeOut" }}
        >
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-cream text-[2rem] md:text-[2.5rem] font-normal mb-4"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-cream border-none rounded-none px-6 py-4 text-brand-blue text-[1.25rem] focus:outline-none focus:ring-2 focus:ring-cream"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-cream text-[2rem] md:text-[2.5rem] font-normal mb-4"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-cream border-none rounded-none px-6 py-4 text-brand-blue text-[1.25rem] focus:outline-none focus:ring-2 focus:ring-cream"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-cream text-[2rem] md:text-[2.5rem] font-normal mb-4"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              className="w-full bg-cream border-none rounded-none px-6 py-4 text-brand-blue text-[1.25rem] focus:outline-none focus:ring-2 focus:ring-cream resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-transparent border-2 border-cream text-cream text-[2rem] md:text-[2.5rem] font-bold py-6 hover:bg-cream hover:text-brand-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {/* reCAPTCHA Attribution (required when badge is hidden) */}
          <p className="text-cream/60 text-xs mt-4 text-center">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-cream">Privacy Policy</a> and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-cream">Terms of Service</a> apply.
          </p>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-cream text-brand-blue text-center text-[1.25rem] md:text-[1.5rem]"
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-red-100 text-red-800 text-center text-[1.25rem] md:text-[1.5rem]"
            >
              Sorry, there was an error sending your message. Please try again or email us directly at info@gocommonwealth.com
            </motion.div>
          )}
        </motion.form>
      </div>

      {/* Footer */}
      <Footer theme="dark" />
    </div>
  );
}
