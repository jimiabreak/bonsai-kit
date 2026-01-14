import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dietaryKey',
  title: 'Dietary Key',
  type: 'document',
  fields: [
    defineField({
      name: 'abbreviation',
      title: 'Abbreviation',
      type: 'string',
      description: 'e.g., VG, V, GF, GFA, CSO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., Vegan, Vegetarian, Gluten Free',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
