import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionFaq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Frequently Asked Questions' }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'FAQ', media: () => '❓' }),
  },
})
