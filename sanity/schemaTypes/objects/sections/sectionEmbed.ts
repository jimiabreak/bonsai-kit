import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionEmbed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'embedType',
      title: 'Embed Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Map', value: 'map' },
          { title: 'Custom', value: 'custom' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: { list: ['16:9', '4:3', '1:1', '9:16'], layout: 'radio' },
      initialValue: '16:9',
    }),
  ],
  preview: {
    select: { title: 'heading', type: 'embedType' },
    prepare: ({ title, type }) => ({ title: title || `Embed (${type || 'unknown'})`, media: () => '🎬' }),
  },
})
