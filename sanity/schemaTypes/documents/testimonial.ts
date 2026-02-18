import { StarIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'author', title: 'Author Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', description: '1-5 stars (optional)', validation: (Rule) => Rule.min(1).max(5).integer() }),
    defineField({ name: 'source', title: 'Source', type: 'string', description: 'e.g., "Google", "Yelp", "TripAdvisor"' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'quote', rating: 'rating' },
    prepare({ title, subtitle, rating }) { return { title, subtitle: rating ? `${'★'.repeat(rating)} — ${subtitle}` : subtitle } },
  },
})
