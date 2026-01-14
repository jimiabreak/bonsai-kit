import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuTab',
  title: 'Menu Tab',
  type: 'document',
  fields: [
    defineField({
      name: 'tabId',
      title: 'Tab ID',
      type: 'string',
      description: 'food, drinks, or features',
      options: {
        list: [
          { title: 'Food', value: 'food' },
          { title: 'Drinks', value: 'drinks' },
          { title: 'Features', value: 'features' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Tab Name',
      type: 'string',
      description: 'Display name for features tab (e.g., "Winter \'26")',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'menuCategory' }] }],
      hidden: ({ document }) => document?.tabId === 'features',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
      hidden: ({ document }) => document?.tabId !== 'features',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
