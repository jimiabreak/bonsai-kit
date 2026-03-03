import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionLogoBar',
  title: 'Logo Bar',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Logo Bar', media: () => '🏷' }),
  },
})
