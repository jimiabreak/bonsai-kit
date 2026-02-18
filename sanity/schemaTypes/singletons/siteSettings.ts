import { CogIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({ name: 'name', title: 'Restaurant Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'Short tagline shown in header or hero' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, description: 'Main logo (used on light backgrounds)' }),
    defineField({ name: 'logoAlt', title: 'Logo (Dark Background)', type: 'image', options: { hotspot: true }, description: 'Alternate logo for dark backgrounds (optional)' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email() }),
    defineField({
      name: 'address', title: 'Address', type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'zip', title: 'ZIP Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string', initialValue: 'US' },
      ],
    }),
    defineField({ name: 'location', title: 'Map Location', type: 'geopoint', description: 'Used for the embedded map on the contact page' }),
    defineField({ name: 'hours', title: 'Opening Hours', type: 'array', of: [{ type: 'openingHours' }], description: 'Set hours for each day of the week' }),
    defineField({ name: 'socialLinks', title: 'Social Media Links', type: 'array', of: [{ type: 'socialLink' }] }),
    defineField({ name: 'reservationUrl', title: 'Reservation URL', type: 'url', description: 'Link to OpenTable, Resy, or other reservation system (optional)', validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'seo', title: 'Default SEO', type: 'seo', description: "Default SEO settings (used when pages don't have their own)" }),
  ],
  preview: { select: { title: 'name' } },
})
