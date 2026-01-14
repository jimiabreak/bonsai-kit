import { defineType, defineField } from 'sanity'
import { ThListIcon } from '@sanity/icons'

export const menuCategoryType = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'Display name like "Savory", "Drinks", "Bowls"',
      validation: (Rule) => Rule.required().error('Category name is required to organize menu items'),
    }),
    defineField({
      name: 'id',
      title: 'Category ID',
      type: 'slug',
      description: 'URL-friendly identifier (auto-generated from name)',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required().error('Slug is required for navigation and sorting'),
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      description: 'Add and reorder menu items for this category',
      of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category appears (0 = first)',
      validation: (Rule) => [
        Rule.required().error('Display order is required to sort categories'),
        Rule.integer().error('Display order must be a whole number'),
        Rule.min(0).error('Display order cannot be negative')
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'id.current',
      itemCount: 'items',
      order: 'order',
    },
    prepare({ title, subtitle, itemCount, order }) {
      const count = Array.isArray(itemCount) ? itemCount.length : 0
      return {
        title,
        subtitle: `Order: ${order} • ${count} item${count !== 1 ? 's' : ''}`,
        description: subtitle ? `ID: ${subtitle}` : 'No slug set',
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
