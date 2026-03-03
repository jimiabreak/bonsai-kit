import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionRichText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({ name: 'body', title: 'Body', type: 'portableText', validation: (Rule) => Rule.required() }),
  ],
  preview: {
    prepare: () => ({ title: 'Rich Text Block', media: () => '📝' }),
  },
})
