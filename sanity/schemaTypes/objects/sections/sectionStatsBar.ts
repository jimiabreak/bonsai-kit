import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionStatsBar',
  title: 'Stats Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Number', validation: (Rule: any) => Rule.required() },
            { name: 'label', type: 'string', title: 'Label', validation: (Rule: any) => Rule.required() },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Stats Bar', media: () => '📊' }),
  },
})
