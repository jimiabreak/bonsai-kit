import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactInfoType = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Contact Information',
      readOnly: true,
      description: 'This is a singleton - only one document should exist',
    }),
    defineField({
      name: 'address',
      type: 'object',
      fields: [
        {name: 'street', type: 'string', title: 'Street Address'},
        {name: 'city', type: 'string', title: 'City'},
        {name: 'state', type: 'string', title: 'State'},
        {name: 'zip', type: 'string', title: 'ZIP Code'},
      ],
    }),
    defineField({
      name: 'phone',
      type: 'string',
      validation: (Rule) => [
        Rule.custom((phone) => {
          if (!phone) return true
          if (!/^\+?[\d\s\-\(\)]+$/.test(phone)) {
            return 'Please enter a valid phone number with digits, spaces, dashes, or parentheses only'
          }
          return true
        }),
      ],
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (Rule) => [
        Rule.email().error('Please enter a valid email address for contact purposes'),
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        {name: 'monday', type: 'string', title: 'Monday'},
        {name: 'tuesday', type: 'string', title: 'Tuesday'},
        {name: 'wednesday', type: 'string', title: 'Wednesday'},
        {name: 'thursday', type: 'string', title: 'Thursday'},
        {name: 'friday', type: 'string', title: 'Friday'},
        {name: 'saturday', type: 'string', title: 'Saturday'},
        {name: 'sunday', type: 'string', title: 'Sunday'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      phone: 'phone',
      email: 'email',
    },
    prepare({title, phone, email}) {
      return {
        title,
        subtitle: `${phone || 'No phone'} | ${email || 'No email'}`,
      }
    },
  },
})
