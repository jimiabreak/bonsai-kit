import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const menuTabType = defineType({
  name: 'menuTab',
  title: 'Menu Tab',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (Rule) => [
        Rule.required().error('Tab label is required for menu navigation'),
      ],
      description: 'Tab name as shown in menu (e.g., "Food", "Drinks", "Features")',
    }),
    defineField({
      name: 'id',
      title: 'Tab ID',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., "food", "drinks")',
      options: {
        source: 'label',
        maxLength: 96,
      },
      validation: (Rule) => [
        Rule.required().error('Tab ID is required to generate URLs'),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order in menu navigation (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      sortOrder: 'sortOrder',
    },
    prepare({title, sortOrder}) {
      return {
        title,
        subtitle: `Order: ${sortOrder}`,
      }
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
