'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import SanityImage from '@/components/sanity/SanityImage'
import Button from '@/components/ui/Button'

interface SplitContentProps {
  heading?: string
  body?: any
  image?: any
  imagePosition?: 'left' | 'right'
  cta?: { label?: string; href?: string }
}

export default function SplitContent({ heading, body, image, imagePosition = 'right', cta }: SplitContentProps) {
  const textBlock = (
    <motion.div variants={fadeInUp}>
      {heading && <h2 className="font-serif text-3xl sm:text-4xl mb-6">{heading}</h2>}
      {body && (
        <div className="prose prose-lg max-w-none text-muted-foreground">
          {Array.isArray(body) ? <PortableText value={body} /> : <p>{body}</p>}
        </div>
      )}
      {cta?.label && cta?.href && (
        <div className="mt-8">
          <Button href={cta.href} variant="outline">{cta.label}</Button>
        </div>
      )}
    </motion.div>
  )

  const imageBlock = image ? (
    <motion.div variants={fadeInUp} className="relative aspect-[4/3] overflow-hidden rounded-sm">
      <SanityImage image={image} alt={heading || 'Content image'} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
    </motion.div>
  ) : null

  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {imagePosition === 'left' ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
        </div>
      </Container>
    </motion.section>
  )
}
