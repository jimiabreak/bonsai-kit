import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionContactForm',
  title: 'Contact Form',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Get in Touch' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Contact Form', media: () => '✉' }),
  },
})
