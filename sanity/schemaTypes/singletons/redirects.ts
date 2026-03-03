import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'redirects',
  title: 'Redirects',
  type: 'document',
  fields: [
    defineField({
      name: 'rules',
      title: 'Redirect Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'source',
              type: 'string',
              title: 'Source Path',
              description: 'e.g. /old-page',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'destination',
              type: 'string',
              title: 'Destination Path',
              description: 'e.g. /new-page',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'permanent',
              type: 'boolean',
              title: 'Permanent (301)',
              initialValue: false,
              description: 'Permanent (301) vs temporary (307) redirect',
            },
          ],
          preview: {
            select: { source: 'source', destination: 'destination', permanent: 'permanent' },
            prepare({ source, destination, permanent }) {
              return {
                title: `${source} → ${destination}`,
                subtitle: permanent ? '301 (permanent)' : '307 (temporary)',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Redirects' }
    },
  },
})
