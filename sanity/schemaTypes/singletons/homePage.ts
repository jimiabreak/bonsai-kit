import { HomeIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'subheading', title: 'Subheading', type: 'text', rows: 2 },
        { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'ctaText', title: 'Button Text', type: 'string' },
        { name: 'ctaLink', title: 'Button Link', type: 'string', description: 'e.g., /menu or /contact' },
      ],
    }),
    defineField({
      name: 'aboutPreview', title: 'About Preview Section', type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body', type: 'portableText' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'featuredMenuHeading', title: 'Featured Menu Heading', type: 'string', description: 'e.g., "From Our Kitchen"' }),
    defineField({ name: 'featuredMenuItems', title: 'Featured Menu Items', type: 'array', of: [{ type: 'reference', to: [{ type: 'menuItem' }] }], description: 'Select 3-6 items to feature on the home page', validation: (Rule) => Rule.max(6) }),
    defineField({ name: 'testimonialHeading', title: 'Testimonials Heading', type: 'string', description: 'e.g., "What Our Guests Say"' }),
    defineField({ name: 'featuredTestimonials', title: 'Featured Testimonials', type: 'array', of: [{ type: 'reference', to: [{ type: 'testimonial' }] }], validation: (Rule) => Rule.max(6) }),
    defineField({
      name: 'ctaSection', title: 'Call to Action Section', type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body Text', type: 'text', rows: 3 },
        { name: 'ctaText', title: 'Button Text', type: 'string' },
        { name: 'ctaLink', title: 'Button Link', type: 'string' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: { prepare() { return { title: 'Home Page' } } },
})
