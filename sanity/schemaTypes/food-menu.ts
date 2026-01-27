import { defineType, defineField } from 'sanity'
import { BasketIcon } from '@sanity/icons'
import { menuCategoryObject } from './shared/menu-category-object'

export const foodMenuType = defineType({
  name: 'foodMenu',
  title: 'Food Menu',
  type: 'document',
  icon: BasketIcon,
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
        title: 'Food Menu',
        subtitle: `${categories?.length || 0} categories, ${itemCount} items`,
      }
    },
  },
})
