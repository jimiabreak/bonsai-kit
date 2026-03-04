'use client'

import { useState } from 'react'
import { stegaClean } from '@sanity/client/stega'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import MenuItem from '@/components/ui/MenuItem'

interface MenuSectionProps {
  heading?: string
  description?: string
  categories?: Array<{
    _id: string
    name: string
    menuSection: string
    description?: string
    items: Array<{ _id: string; name: string; description?: string; price: string; dietaryTags?: string[] }>
  }>
}

export default function MenuSection({ heading, description, categories }: MenuSectionProps) {
  const sections = Array.from(new Set(categories?.map((c) => stegaClean(c.menuSection)) || []))
  const [activeTab, setActiveTab] = useState(sections[0] || 'food')
  if (!categories || categories.length === 0) return null
  const filteredCategories = categories.filter((c) => stegaClean(c.menuSection) === activeTab)
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="py-20 sm:py-28">
      <Container>
        <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl text-center mb-4">{heading || 'Our Menu'}</motion.h2>
        {description && <motion.p variants={fadeInUp} className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">{description}</motion.p>}
        {sections.length > 1 && (
          <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-12">
            {sections.map((section) => (
              <button key={section} onClick={() => setActiveTab(section)} className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${activeTab === section ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                {section}
              </button>
            ))}
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {filteredCategories.map((category) => (
              <div key={category._id} className="mb-12 last:mb-0">
                <h3 className="font-serif text-2xl mb-2">{category.name}</h3>
                {category.description && <p className="text-muted-foreground mb-6">{category.description}</p>}
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <MenuItem key={item._id} name={item.name} price={`$${item.price}`} description={item.description || ''} dietaryTags={item.dietaryTags} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </motion.section>
  )
}
