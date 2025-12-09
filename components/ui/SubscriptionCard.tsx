'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Button from './Button';
import { SubscriptionCardProps } from '@/types';

export default function SubscriptionCard({
  title,
  image,
  imageAlt = 'Subscription coffee',
  description,
  includes,
  frequencyNote,
  options,
  onSignUp,
  processingVariantId = null
}: SubscriptionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = !prefersReducedMotion ? {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="bg-cream border-2 border-brand-blue rounded-sm p-6 flex flex-col gap-4 w-full max-w-[700px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Title */}
      <h3 className="text-subscription-title text-brand-blue text-center">
        {title}
      </h3>

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>

      {/* Description */}
      <p className="text-subscription-body text-brand-blue">
        {description}
      </p>

      {/* What You Get */}
      <div className="text-brand-blue space-y-2">
        <p className="text-subscription-label">WHAT YOU GET:</p>
        {includes.map((item, index) => (
          <p key={index} className="text-subscription-include">
            — {item}
          </p>
        ))}
        <p className="text-subscription-italic mt-4">
          {frequencyNote}
        </p>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-brand-blue" />

      {/* Subscription Options */}
      {options.map((option, index) => (
        <div key={index}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-6 md:gap-4">
            {/* Price Section */}
            <div className="flex flex-col justify-between">
              <p className="text-subscription-detail text-brand-blue mb-2 md:mb-0">
                PRICE PER DELIVERY:
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-subscription-price text-brand-blue">
                  ${option.price}
                </p>
                <p className="text-subscription-detail text-brand-blue">
                  + ${option.shipping} SHIPPING
                </p>
              </div>
            </div>

            {/* Frequency Section */}
            <div className="flex flex-col justify-between">
              <p className="text-subscription-detail text-brand-blue mb-2 md:mb-0">
                FREQUENCY:
              </p>
              <div className="flex flex-col gap-1">
                <div className="text-subscription-frequency text-brand-blue">
                  <p className="mb-0">{option.bags} Bags</p>
                  <p className="mb-0">{option.frequency}</p>
                </div>
                <p className="text-subscription-detail text-brand-blue">
                  {option.usageRate}
                </p>
              </div>
            </div>

            {/* Button */}
            <Button
              variant="subscription"
              size="subscription"
              onClick={() => onSignUp?.(option)}
              disabled={processingVariantId !== null}
              className="w-full md:w-[254px]"
            >
              {processingVariantId === option.shopifyVariantId ? 'PROCESSING...' : 'SIGN UP'}
            </Button>
          </div>

          {/* Divider after each option except last */}
          {index < options.length - 1 && (
            <div className="h-[2px] w-full bg-brand-blue mt-6 md:mt-4" />
          )}
        </div>
      ))}
    </motion.div>
  );
}
