import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'sectionFeaturedMenu',
  title: 'Featured Menu',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'From Our Kitchen' }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'menuItem' }] })],
      validation: (Rule) => Rule.max(6).unique(),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Featured Menu', media: () => '🍽' }),
  },
})
