import { defineField, defineArrayMember } from 'sanity'

export const menuItemObject = defineArrayMember({
  type: 'object',
  name: 'menuItemObject',
  title: 'Menu Item',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Item name without dietary tags',
      validation: (Rule) => Rule.required().error('Item name is required'),
    }),
    defineField({
      name: 'dietaryTags',
      title: 'Dietary Tags',
      type: 'array',
      description: 'Select all that apply',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'V - Vegetarian', value: 'V' },
          { title: 'VG - Vegan', value: 'VG' },
          { title: 'GF - Gluten Free', value: 'GF' },
          { title: 'GFA - Gluten Free Available', value: 'GFA' },
          { title: 'CSO - Contains Sesame Oil', value: 'CSO' },
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "12" or "8/11" for size options',
      validation: (Rule) => Rule.required().error('Price is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      dietary: 'dietaryTags',
    },
    prepare({ title, subtitle, dietary }) {
      const tags = dietary?.filter((t: string) => t !== 'none')?.join(') (')
      const displayName = tags ? `${title} (${tags})` : title
      return {
        title: displayName || 'New item',
        subtitle: subtitle ? `$${subtitle}` : 'No price',
      }
    },
  },
})
