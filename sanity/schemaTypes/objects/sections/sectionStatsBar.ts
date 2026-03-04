import { defineType, defineField, defineArrayMember } from 'sanity'

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
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'number', type: 'string', title: 'Number', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Stats Bar', media: () => '📊' }),
  },
})
