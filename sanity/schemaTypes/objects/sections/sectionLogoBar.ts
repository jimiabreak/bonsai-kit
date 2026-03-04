import { defineType, defineField, defineArrayMember } from 'sanity'

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
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Logo Bar', media: () => '🏷' }),
  },
})
