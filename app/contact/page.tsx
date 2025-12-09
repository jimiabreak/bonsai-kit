'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-brand-blue min-h-screen">
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
          <h1 className="text-cream text-[120px] md:text-[180px] lg:text-[240px] font-sans font-normal leading-none tracking-tight">
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

          {/* reCAPTCHA Placeholder */}
          <div className="mb-8">
            <div className="inline-block bg-cream px-4 py-3">
              <p className="text-brand-blue text-sm">reCAPTCHA placeholder</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-transparent border-2 border-cream text-cream text-[2rem] md:text-[2.5rem] font-bold py-6 hover:bg-cream hover:text-brand-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </motion.form>
      </div>

      {/* Footer */}
      <Footer theme="light" />
    </div>
  );
}
