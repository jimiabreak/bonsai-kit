import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', description: 'Small text above the heading (optional)' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'cta', title: 'Call to Action', type: 'cta' }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Left-aligned', value: 'left' },
          { title: 'Split (text left, image right)', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'subheading' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Hero', subtitle, media: () => '🦸' }),
  },
})
