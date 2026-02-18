import { ThListIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({ name: 'name', title: 'Category Name', type: 'string', description: 'e.g., "Appetizers", "Mains", "Cocktails"', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, description: 'Optional description shown below the category heading' }),
    defineField({
      name: 'menuSection', title: 'Menu Section', type: 'string', description: 'Which tab/section this category belongs to',
      options: { list: [{ title: 'Food', value: 'food' }, { title: 'Drinks', value: 'drinks' }, { title: 'Desserts', value: 'desserts' }], layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Lower numbers appear first', validation: (Rule) => Rule.required().integer().min(0) }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', section: 'menuSection', order: 'order' },
    prepare({ title, section, order }) { return { title, subtitle: `${section} · #${order}` } },
  },
})
