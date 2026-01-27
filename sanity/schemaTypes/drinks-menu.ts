import { defineType, defineField } from 'sanity'
import { DropIcon } from '@sanity/icons'
import { menuCategoryObject } from './shared/menu-category-object'

export const drinksMenuType = defineType({
  name: 'drinksMenu',
  title: 'Drinks Menu',
  type: 'document',
  icon: DropIcon,
  fields: [
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Drag to reorder categories',
      of: [menuCategoryObject],
    }),
  ],
  preview: {
    select: { categories: 'categories' },
    prepare({ categories }) {
      const itemCount = categories?.reduce(
        (sum: number, cat: { items?: unknown[] }) => sum + (cat.items?.length || 0),
        0
      ) || 0
      return {
        title: 'Drinks Menu',
        subtitle: `${categories?.length || 0} categories, ${itemCount} items`,
      }
    },
  },
})
