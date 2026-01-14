import { defineType, defineField } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

export const menuTabType = defineType({
  name: 'menuTab',
  title: 'Menu Tab',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'tabId',
      title: 'Tab ID',
      type: 'string',
      description: 'Select which tab this represents',
      options: {
        list: [
          { title: 'Food', value: 'food' },
          { title: 'Drinks', value: 'drinks' },
          { title: 'Features', value: 'features' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Tab ID is required to determine which tab this content belongs to'),
    }),
    defineField({
      name: 'name',
      title: 'Tab Name',
      type: 'string',
      description: 'Display name for features tab (e.g., "Winter \'26"). Leave empty for Food/Drinks tabs.',
      hidden: ({ document }) => document?.tabId !== 'features',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Add and reorder categories for this tab',
      of: [{ type: 'reference', to: [{ type: 'menuCategory' }] }],
      hidden: ({ document }) => document?.tabId === 'features',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      description: 'Add and reorder featured items (only for Features tab)',
      of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
      hidden: ({ document }) => document?.tabId !== 'features',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order tabs appear (0 = Food, 1 = Drinks, 2 = Features)',
      validation: (Rule) => [
        Rule.required().error('Display order is required to sort tabs'),
        Rule.integer().error('Display order must be a whole number'),
        Rule.min(0).error('Display order cannot be negative')
      ],
    }),
  ],
  preview: {
    select: {
      tabId: 'tabId',
      name: 'name',
      order: 'order',
      categoryCount: 'categories',
      itemCount: 'items',
    },
    prepare({ tabId, name, order, categoryCount, itemCount }) {
      const isFeatures = tabId === 'features'
      const count = isFeatures
        ? (Array.isArray(itemCount) ? itemCount.length : 0)
        : (Array.isArray(categoryCount) ? categoryCount.length : 0)
      const countLabel = isFeatures ? 'item' : 'category'

      return {
        title: name || (tabId ? tabId.charAt(0).toUpperCase() + tabId.slice(1) : 'Unnamed Tab'),
        subtitle: `Order: ${order} • ${count} ${countLabel}${count !== 1 ? 's' : ''}`,
        description: `Tab: ${tabId}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
