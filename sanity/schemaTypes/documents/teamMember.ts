import { UsersIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g., "Head Chef", "Sommelier", "General Manager"' }),
    defineField({ name: 'bio', title: 'Bio', type: 'portableText' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', validation: (Rule) => Rule.integer().min(0) }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
})
