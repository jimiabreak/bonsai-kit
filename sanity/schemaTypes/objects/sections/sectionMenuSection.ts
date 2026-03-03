import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionMenuSection',
  title: 'Full Menu',
  type: 'object',
  description: 'Renders the full menu with category tabs — uses existing menuCategory/menuItem data',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Our Menu' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Full Menu', media: () => '📋' }),
  },
})
