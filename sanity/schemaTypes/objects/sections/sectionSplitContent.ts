import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionSplitContent',
  title: 'Split Content',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'portableText' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: { list: ['left', 'right'], layout: 'radio' },
      initialValue: 'right',
    }),
    defineField({ name: 'cta', title: 'Call to Action', type: 'cta' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Split Content', media: () => '◫' }),
  },
})
