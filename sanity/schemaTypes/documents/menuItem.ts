import { DocumentTextIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'name', title: 'Item Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'price', title: 'Price', type: 'string', description: 'Use format: "14" for single price, "8/12" for small/large', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, description: 'Optional — not all menu items need photos' }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'menuCategory' }], validation: (Rule) => Rule.required() }),
    defineField({
      name: 'dietaryTags', title: 'Dietary Tags', type: 'array', of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegetarian', value: 'V' }, { title: 'Vegan', value: 'VG' },
          { title: 'Gluten Free', value: 'GF' }, { title: 'Gluten Free Available', value: 'GFA' },
          { title: 'Dairy Free', value: 'DF' }, { title: 'Contains Nuts', value: 'N' },
          { title: 'Spicy', value: 'S' },
        ],
        layout: 'grid',
      },
    }),
    defineField({ name: 'featured', title: 'Featured on Home Page', type: 'boolean', initialValue: false, description: 'Show this item in the featured section on the home page' }),
    defineField({ name: 'available', title: 'Available', type: 'boolean', initialValue: true, description: 'Toggle off to 86 this item (hides from menu without deleting)' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Sort position within its category (lower = first)', validation: (Rule) => Rule.integer().min(0) }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', price: 'price', category: 'category.name', available: 'available', media: 'image' },
    prepare({ title, price, category, available, media }) {
      return { title: `${available === false ? '🚫 ' : ''}${title}`, subtitle: `$${price} · ${category || 'No category'}`, media }
    },
  },
})
