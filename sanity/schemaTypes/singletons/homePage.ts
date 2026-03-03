import { HomeIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import { pageBuilderField } from '../builders/pageBuilder'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
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
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
