'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import MenuItem from '@/components/ui/MenuItem'
import Button from '@/components/ui/Button'

interface FeaturedMenuProps {
  heading?: string
  items?: Array<{ _id: string; name: string; description?: string; price: string; dietaryTags?: string[] }>
}

export default function FeaturedMenu({ heading, items }: FeaturedMenuProps) {
  if (!items || items.length === 0) return null
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="py-20 sm:py-28 bg-muted">
      <Container>
        <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl text-center mb-12">{heading || 'From Our Kitchen'}</motion.h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {items.map((item) => (
            <motion.div key={item._id} variants={fadeInUp}>
              <MenuItem name={item.name} price={`$${item.price}`} description={item.description || ''} dietaryTags={item.dietaryTags} />
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeInUp} className="text-center mt-12">
          <Button href="/menu" variant="outline">View Full Menu</Button>
        </motion.div>
      </Container>
    </motion.section>
  )
}
