import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (Rule: any) => Rule.required() },
            { name: 'href', type: 'string', title: 'Link', validation: (Rule: any) => Rule.required() },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button (optional)',
      type: 'cta',
      description: 'Optional call-to-action button shown in the header (e.g. "Reserve")',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Header' }
    },
  },
})
