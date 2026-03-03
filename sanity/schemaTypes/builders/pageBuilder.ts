import { defineField } from 'sanity'

export const pageBuilderField = defineField({
  name: 'pageBuilder',
  title: 'Page Sections',
  type: 'array',
  of: [
    { type: 'sectionHero' },
    { type: 'sectionSplitContent' },
    { type: 'sectionRichText' },
    { type: 'sectionCta' },
    { type: 'sectionFeaturedMenu' },
    { type: 'sectionTestimonials' },
    { type: 'sectionFaq' },
    { type: 'sectionTeam' },
    { type: 'sectionImageGallery' },
    { type: 'sectionContactForm' },
    { type: 'sectionEmbed' },
    { type: 'sectionMenuSection' },
    { type: 'sectionLogoBar' },
    { type: 'sectionStatsBar' },
  ],
})
