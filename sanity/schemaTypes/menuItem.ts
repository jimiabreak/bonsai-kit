import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Item name is required to display on the menu'),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Price in dollars (e.g., "23" or "8/11" for cup/bowl)',
      validation: (Rule) => [
        Rule.required().error('Price is required to display on the menu'),
        Rule.custom((value) => {
          if (!value) return true
          // Allow formats like "23", "8/11", "15.50"
          const validFormat = /^\d+(\.\d{1,2})?$|^\d+\/\d+$/.test(value)
          return validFormat || 'Price should be in format "23" or "8/11" for cup/bowl options'
        }).warning()
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description of the item ingredients or preparation',
      validation: (Rule) => Rule.max(500).warning('Consider keeping descriptions under 500 characters for readability'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      description: 'description',
    },
    prepare({ title, subtitle, description }) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle}` : 'No price set',
        description: description ? description.substring(0, 60) + '...' : 'No description',
      }
    },
  },
})
