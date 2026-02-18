import { defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the page title for search engines (max 60 chars)',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best SEO'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for search results (max 160 chars)',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO'),
    },
    {
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when shared on social media (1200x630px recommended)',
    },
  ],
})
