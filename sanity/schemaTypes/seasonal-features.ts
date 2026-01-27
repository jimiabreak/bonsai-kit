import { defineType, defineField } from 'sanity'
import { StarIcon } from '@sanity/icons'
import { menuItemObject } from './shared/menu-item-object'

export const seasonalFeaturesType = defineType({
  name: 'seasonalFeatures',
  title: 'Seasonal Features',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'seasonName',
      title: 'Season Name',
      type: 'string',
      description: 'e.g., "Winter \'26" or "Spring \'26"',
      validation: (Rule) => Rule.required().error('Season name is required'),
    }),
    defineField({
      name: 'items',
      title: 'Featured Items',
      type: 'array',
      of: [menuItemObject],
    }),
  ],
  preview: {
    select: { title: 'seasonName', items: 'items' },
    prepare({ title, items }) {
      return {
        title: title || 'Seasonal Features',
        subtitle: `${items?.length || 0} featured items`,
      }
    },
  },
})
