import { HelpCircleIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'portableText', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', description: 'Optional grouping (e.g., "Reservations", "Dietary", "General")' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', validation: (Rule) => Rule.integer().min(0) }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'category' } },
})
