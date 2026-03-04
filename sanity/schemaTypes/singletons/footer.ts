import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'columns',
      title: 'Link Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Column Title', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'href', type: 'string', title: 'Link', validation: (Rule) => Rule.required() }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
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
