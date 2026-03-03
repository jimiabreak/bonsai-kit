'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import SanityImage from '@/components/sanity/SanityImage'
import Button from '@/components/ui/Button'

interface HeroProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  image?: any
  cta?: { label?: string; href?: string }
  layout?: 'centered' | 'left' | 'split'
}

export default function Hero({ eyebrow, heading, subheading, image, cta, layout = 'centered' }: HeroProps) {
  if (layout === 'split') {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        <div className="flex items-center justify-center px-8 py-20 sm:py-28">
          <div className="max-w-lg">
            {eyebrow && (
              <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-sm uppercase tracking-wider text-primary mb-4">
                {eyebrow}
              </motion.p>
            )}
            <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl sm:text-5xl font-bold mb-6">
              {heading || 'Welcome'}
            </motion.h1>
            {subheading && (
              <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-lg text-muted-foreground mb-8">
                {subheading}
              </motion.p>
            )}
            {cta?.label && cta?.href && (
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <Button href={cta.href} variant="primary" size="lg">{cta.label}</Button>
              </motion.div>
            )}
          </div>
        </div>
        {image && (
          <div className="relative min-h-[50vh] md:min-h-full">
            <SanityImage image={image} alt={heading || 'Hero'} fill sizes="50vw" className="object-cover" priority />
          </div>
        )}
      </section>
    )
  }

  const alignClass = layout === 'left' ? 'text-left items-start' : 'text-center'

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-white">
      {image && (
        <div className="absolute inset-0">
          <SanityImage image={image} alt={heading || 'Hero'} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <div className={`relative z-10 px-4 max-w-3xl ${alignClass}`}>
        {eyebrow && (
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-sm uppercase tracking-wider text-primary-light mb-4">
            {eyebrow}
          </motion.p>
        )}
        <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          {heading || 'Welcome'}
        </motion.h1>
        {subheading && (
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-lg sm:text-xl opacity-90 mb-8">
            {subheading}
          </motion.p>
        )}
        {cta?.label && cta?.href && (
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <Button href={cta.href} variant="primary" size="lg">{cta.label}</Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
