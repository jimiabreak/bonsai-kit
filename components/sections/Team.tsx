'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { SanityImageSource } from '@sanity/image-url'
import Container from '@/components/layout/Container'
import TeamCard from '@/components/ui/TeamCard'

interface TeamProps {
  heading?: string
  subheading?: string
  teamMembers?: Array<{ _id: string; name: string; role?: string; image: SanityImageSource }>
}

export default function Team({ heading, subheading, teamMembers }: TeamProps) {
  if (!teamMembers || teamMembers.length === 0) return null
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="py-20 sm:py-28 bg-muted">
      <Container>
        <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl text-center mb-4">{heading || 'Meet the Team'}</motion.h2>
        {subheading && <motion.p variants={fadeInUp} className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">{subheading}</motion.p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <motion.div key={member._id} variants={fadeInUp}>
              <TeamCard name={member.name} role={member.role} image={member.image} />
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  )
}
