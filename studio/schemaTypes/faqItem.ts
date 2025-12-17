import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      validation: (Rule) => [
        Rule.required().error('Question is required for FAQ display'),
      ],
    }),
    defineField({
      name: 'answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => [
        Rule.required().error('Answer is required for FAQ display'),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order on FAQ page (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      answer: 'answer',
    },
    prepare({title, answer}) {
      return {
        title,
        subtitle: answer ? answer.substring(0, 60) + '...' : 'No answer',
      }
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
