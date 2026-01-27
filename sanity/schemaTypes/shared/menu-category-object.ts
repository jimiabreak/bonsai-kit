import { defineField, defineArrayMember } from 'sanity'
import { menuItemObject } from './menu-item-object'

export const menuCategoryObject = defineArrayMember({
  type: 'object',
  name: 'menuCategoryObject',
  title: 'Category',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Savory", "Sweet", "Espresso"',
      validation: (Rule) => Rule.required().error('Category name is required'),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [menuItemObject],
    }),
  ],
  preview: {
    select: { title: 'name', items: 'items' },
    prepare({ title, items }) {
      return {
        title: title || 'New category',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})
