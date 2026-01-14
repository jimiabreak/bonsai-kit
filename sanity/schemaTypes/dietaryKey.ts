import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const dietaryKeyType = defineType({
  name: 'dietaryKey',
  title: 'Dietary Key',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'abbreviation',
      title: 'Abbreviation',
      type: 'string',
      description: 'Short code shown in menu items (e.g., VG, V, GF, GFA, CSO)',
      validation: (Rule) => [
        Rule.required().error('Abbreviation is required to display dietary information'),
        Rule.max(10).warning('Keep abbreviations short (under 10 characters)')
      ],
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'Full description (e.g., Vegan, Vegetarian, Gluten Free)',
      validation: (Rule) => Rule.required().error('Full name is required for the dietary key legend'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in the dietary key legend (0 = first)',
      validation: (Rule) => [
        Rule.required().error('Display order is required to sort dietary keys'),
        Rule.integer().error('Display order must be a whole number'),
        Rule.min(0).error('Display order cannot be negative')
      ],
    }),
  ],
  preview: {
    select: {
      title: 'abbreviation',
      subtitle: 'fullName',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `Order: ${order}`,
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
