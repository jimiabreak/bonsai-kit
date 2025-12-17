/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schema types from the studio folder
import { menuItemType } from './studio/schemaTypes/menuItem'
import { menuCategoryType } from './studio/schemaTypes/menuCategory'
import { menuTabType } from './studio/schemaTypes/menuTab'
import { faqItemType } from './studio/schemaTypes/faqItem'
import { contactInfoType } from './studio/schemaTypes/contactInfo'

export default defineConfig({
  name: 'default',
  title: 'Commonwealth Coffee',

  projectId: 'wvwhqsyr',
  dataset: 'production',

  basePath: '/admin',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      // Menu types
      menuTabType,
      menuCategoryType,
      menuItemType,

      // Other content types
      faqItemType,
      contactInfoType,
    ],
  },
})
