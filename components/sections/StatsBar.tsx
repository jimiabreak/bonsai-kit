'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'

interface StatsBarProps {
  stats?: Array<{ _key: string; number: string; label: string }>
}

export default function StatsBar({ stats }: StatsBarProps) {
  if (!stats || stats.length === 0) return null
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-16 sm:py-20 bg-foreground text-background">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <motion.div key={stat._key} variants={fadeInUp}>
              <p className="font-serif text-4xl sm:text-5xl font-bold text-primary-light">{stat.number}</p>
              <p className="text-sm uppercase tracking-wider mt-2 opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  )
}
