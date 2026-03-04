'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import type { SanityImageSource } from '@sanity/image-url'
import SanityImage from '@/components/sanity/SanityImage'
import Button from '@/components/ui/Button'

interface CTAProps {
  heading?: string
  body?: string
  cta?: { label?: string; href?: string }
  backgroundImage?: SanityImageSource
}

export default function CTA({ heading, body, cta, backgroundImage }: CTAProps) {
  return (
    <section className="relative py-20 sm:py-28 text-white">
      {backgroundImage && (
        <div className="absolute inset-0">
          <SanityImage image={backgroundImage} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      <Container>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 text-center max-w-2xl mx-auto">
          {heading && <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl mb-4">{heading}</motion.h2>}
          {body && <motion.p variants={fadeInUp} className="text-lg opacity-90 mb-8">{body}</motion.p>}
          {cta?.label && cta?.href && (
            <motion.div variants={fadeInUp}>
              <Button href={cta.href} variant="primary" size="lg">{cta.label}</Button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
