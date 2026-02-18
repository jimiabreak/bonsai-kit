import { defineType } from 'sanity'

export default defineType({
  name: 'openingHours',
  title: 'Opening Hours',
  type: 'object',
  fields: [
    {
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'openTime',
      title: 'Open',
      type: 'string',
      description: 'e.g., "11:00 AM"',
      hidden: ({ parent }) => parent?.closed,
    },
    {
      name: 'closeTime',
      title: 'Close',
      type: 'string',
      description: 'e.g., "10:00 PM"',
      hidden: ({ parent }) => parent?.closed,
    },
    {
      name: 'closed',
      title: 'Closed this day',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { day: 'day', open: 'openTime', close: 'closeTime', closed: 'closed' },
    prepare({ day, open, close, closed }) {
      return {
        title: day,
        subtitle: closed ? 'Closed' : `${open} – ${close}`,
      }
    },
  },
})
