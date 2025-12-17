import {defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export const menuCategoryType = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => [
        Rule.required().error('Category name is required to organize menu sections'),
      ],
    }),
    defineField({
      name: 'id',
      title: 'Category ID',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., "savory", "sweet")',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => [
        Rule.required().error('Category ID is required to generate URLs'),
      ],
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      description: 'Optional description for the category',
    }),
    defineField({
      name: 'tab',
      type: 'reference',
      to: [{type: 'menuTab'}],
      validation: (Rule) => [
        Rule.required().error('Tab is required to organize the menu structure'),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order within the tab (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      tab: 'tab.label',
      itemCount: 'id',
    },
    prepare({title, tab}) {
      return {
        title,
        subtitle: tab || 'No tab assigned',
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
