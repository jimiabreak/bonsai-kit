import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => [
        Rule.required().error('Item name is required to display on the menu'),
        Rule.max(100).warning('Item name should be concise (under 100 characters)'),
      ],
    }),
    defineField({
      name: 'price',
      type: 'string',
      description: 'Price without currency symbol (e.g., "20" or "12")',
      validation: (Rule) => [
        Rule.required().error('Price is required to display on the menu'),
        Rule.custom((price) => {
          if (!price) return true
          if (isNaN(Number(price))) {
            return 'Price must be a number'
          }
          if (Number(price) < 0) {
            return 'Price cannot be negative'
          }
          return true
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the menu item',
      validation: (Rule) => [
        Rule.max(300).warning('Description should be concise (under 300 characters for readability)'),
      ],
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'menuCategory'}],
      validation: (Rule) => [
        Rule.required().error('Category is required to organize the menu'),
      ],
    }),
    defineField({
      name: 'dietary',
      title: 'Dietary Information',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Vegetarian (V)', value: 'V'},
              {title: 'Vegan (VE)', value: 'VE'},
              {title: 'Gluten Free (GF)', value: 'GF'},
              {title: 'Gluten Free Available (GFA)', value: 'GFA'},
              {title: 'Choose Side Option (CSO)', value: 'CSO'},
            ],
          },
        },
      ],
      description: 'Select all dietary tags that apply',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Regular', value: 'regular'},
          {title: 'New', value: 'new'},
          {title: 'Seasonal', value: 'seasonal'},
        ],
        layout: 'radio',
      },
      initialValue: 'regular',
      description: 'Mark special items for highlighting on the menu',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image for the menu item',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order within the category (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      category: 'category.name',
      media: 'image',
    },
    prepare({title, price, category, media}) {
      return {
        title,
        subtitle: `$${price} - ${category || 'No category'}`,
        media,
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
      title: 'Price Low-High',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
