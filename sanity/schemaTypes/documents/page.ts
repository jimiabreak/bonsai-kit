import { DocumentIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import { pageBuilderField } from '../builders/pageBuilder'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'page', title: 'Page', default: true },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'page',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (legacy)',
      type: 'slug',
      options: { source: 'title' },
      hidden: true,
      description: 'Legacy field — use URI instead',
    }),
    defineField({
      name: 'uri',
      title: 'URI',
      type: 'string',
      description: 'Full path, e.g. /about — must start with /, lowercase, no trailing slash',
      group: 'page',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\/[a-z0-9\-/]*[a-z0-9]$/, {
            name: 'uri',
            invert: false,
          })
          .error('Must start with /, be lowercase, and have no trailing slash (e.g. /about)'),
    }),
    defineField({
      ...pageBuilderField,
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', uri: 'uri', slug: 'slug.current' },
    prepare({ title, uri, slug }) {
      return { title, subtitle: uri || (slug ? `/${slug}` : '') }
    },
  },
})
