import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'sectionImageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Our Space' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'galleryImage' }] })],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Image Gallery', media: () => '🖼' }),
  },
})
