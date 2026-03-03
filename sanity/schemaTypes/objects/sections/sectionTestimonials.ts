import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionTestimonials',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'What Our Guests Say' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Testimonials', media: () => '⭐' }),
  },
})
