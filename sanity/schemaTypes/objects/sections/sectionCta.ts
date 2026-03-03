import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionCta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({ name: 'cta', title: 'Button', type: 'cta' }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Call to Action', media: () => '📢' }),
  },
})
