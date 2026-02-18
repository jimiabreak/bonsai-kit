'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import SanityImage from '@/components/sanity/SanityImage'
import MenuItem from '@/components/ui/MenuItem'
import TestimonialCard from '@/components/ui/TestimonialCard'
import Button from '@/components/ui/Button'
import type { HomePage, MenuItem as MenuItemType, Testimonial } from '@/types'

interface HomePageSectionsProps {
  page: HomePage
}

export default function HomePageSections({ page }: HomePageSectionsProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-white">
        {page?.hero?.image && (
          <div className="absolute inset-0">
            <SanityImage
              image={page.hero.image}
              alt={page.hero.heading || 'Restaurant'}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            {page?.hero?.heading || 'Welcome'}
          </motion.h1>
          {page?.hero?.subheading && (
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl opacity-90 mb-8"
            >
              {page.hero.subheading}
            </motion.p>
          )}
          {page?.hero?.ctaText && page?.hero?.ctaLink && (
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Button href={page.hero.ctaLink} variant="primary" size="lg">
                {page.hero.ctaText}
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Preview */}
      {page?.aboutPreview && (
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="py-20 sm:py-28"
        >
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <h2 className="font-serif text-3xl sm:text-4xl mb-6">
                  {page.aboutPreview.heading || 'Our Story'}
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>{page.aboutPreview.body || 'Discover our passion for exceptional cuisine and warm hospitality.'}</p>
                </div>
                <div className="mt-8">
                  <Button href="/about" variant="outline">
                    Learn More
                  </Button>
                </div>
              </motion.div>
              {page.aboutPreview.image && (
                <motion.div variants={fadeInUp} className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <SanityImage
                    image={page.aboutPreview.image}
                    alt="About our restaurant"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </div>
          </Container>
        </motion.section>
      )}

      {/* Featured Menu */}
      {page?.featuredMenuItems && page.featuredMenuItems.length > 0 && (
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="py-20 sm:py-28 bg-muted"
        >
          <Container>
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl text-center mb-12">
              {page.featuredMenuHeading || 'From Our Kitchen'}
            </motion.h2>
            <div className="max-w-2xl mx-auto space-y-6">
              {(page.featuredMenuItems as MenuItemType[]).map((item) => (
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
            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Button href="/menu" variant="outline">
                View Full Menu
              </Button>
            </motion.div>
          </Container>
        </motion.section>
      )}

      {/* Testimonials */}
      {page?.featuredTestimonials && page.featuredTestimonials.length > 0 && (
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="py-20 sm:py-28"
        >
          <Container>
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl text-center mb-12">
              {page.testimonialHeading || 'What Our Guests Say'}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(page.featuredTestimonials as Testimonial[]).map((t) => (
                <TestimonialCard
                  key={t._id}
                  author={t.author}
                  quote={t.quote}
                  rating={t.rating}
                  source={t.source}
                />
              ))}
            </div>
          </Container>
        </motion.section>
      )}

      {/* CTA */}
      {page?.ctaSection && (
        <section className="relative py-20 sm:py-28 text-white">
          {page.ctaSection.backgroundImage && (
            <div className="absolute inset-0">
              <SanityImage
                image={page.ctaSection.backgroundImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          )}
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 text-center max-w-2xl mx-auto"
            >
              <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl mb-4">
                {page.ctaSection.heading}
              </motion.h2>
              {page.ctaSection.body && (
                <motion.p variants={fadeInUp} className="text-lg opacity-90 mb-8">
                  {page.ctaSection.body}
                </motion.p>
              )}
              {page.ctaSection.ctaText && page.ctaSection.ctaLink && (
                <motion.div variants={fadeInUp}>
                  <Button href={page.ctaSection.ctaLink} variant="primary" size="lg">
                    {page.ctaSection.ctaText}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </Container>
        </section>
      )}
    </>
  )
}
