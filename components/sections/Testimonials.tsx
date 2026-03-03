'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import TestimonialCard from '@/components/ui/TestimonialCard'

interface TestimonialsProps {
  heading?: string
  testimonials?: Array<{ _id: string; author: string; quote: string; rating?: number; source?: string }>
}

export default function Testimonials({ heading, testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="py-20 sm:py-28">
      <Container>
        <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl text-center mb-12">{heading || 'What Our Guests Say'}</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t._id} author={t.author} quote={t.quote} rating={t.rating} source={t.source} />
          ))}
        </div>
      </Container>
    </motion.section>
  )
}
