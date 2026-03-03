import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'columns',
      title: 'Link Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Column Title', validation: (Rule: any) => Rule.required() },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
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
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({ name: 'copyrightText', title: 'Copyright Text', type: 'string', description: 'e.g. "All rights reserved." — year and business name are added automatically' }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer' }
    },
  },
})
