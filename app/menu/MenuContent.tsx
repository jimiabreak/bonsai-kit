'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import MenuItem from '@/components/ui/MenuItem'

interface Category {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  menuSection: string
  items: Array<{
    _id: string
    name: string
    description?: string
    price: string
    dietaryTags?: string[]
  }>
}

const sections = [
  { key: 'food', label: 'Food' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'desserts', label: 'Desserts' },
]

export default function MenuContent({ categories }: { categories: Category[] }) {
  const availableSections = sections.filter((s) =>
    categories.some((c) => c.menuSection === s.key && c.items.length > 0)
  )
  const [activeTab, setActiveTab] = useState(availableSections[0]?.key || 'food')

  const filteredCategories = categories.filter(
    (c) => c.menuSection === activeTab && c.items.length > 0
  )

  return (
    <Container>
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="font-serif text-4xl sm:text-5xl text-center mb-12"
      >
        Our Menu
      </motion.h1>

      {/* Tabs */}
      {availableSections.length > 1 && (
        <div className="flex justify-center gap-1 mb-12">
          {availableSections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveTab(section.key)}
              className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors min-h-touch ${
                activeTab === section.key
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}

      {/* Categories and Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {filteredCategories.map((category) => (
            <motion.section
              key={category._id}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl">{category.name}</h2>
                {category.description && (
                  <p className="text-muted-foreground mt-2">{category.description}</p>
                )}
              </motion.div>
              <div className="space-y-6">
                {category.items.map((item) => (
                  <motion.div key={item._id} variants={fadeInUp}>
                    <MenuItem
                      name={item.name}
                      price={`$${item.price}`}
                      description={item.description || ''}
                      dietaryTags={item.dietaryTags}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
          {filteredCategories.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No items available in this section yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </Container>
  )
}
