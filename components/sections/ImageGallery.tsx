'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import GalleryGrid from '@/components/ui/GalleryGrid'

interface ImageGalleryProps {
  heading?: string
  images?: Array<{ _id: string; image: any; alt: string; caption?: string }>
}

export default function ImageGallery({ heading, images }: ImageGalleryProps) {
  if (!images || images.length === 0) return null
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="py-20 sm:py-28">
      <Container>
        <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl text-center mb-12">{heading || 'Gallery'}</motion.h2>
        <GalleryGrid images={images} />
      </Container>
    </motion.section>
  )
}
