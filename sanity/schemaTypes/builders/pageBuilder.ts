import { defineField, defineArrayMember } from 'sanity'

export const pageBuilderField = defineField({
  name: 'pageBuilder',
  title: 'Page Sections',
  type: 'array',
  of: [
    defineArrayMember({ type: 'sectionHero' }),
    defineArrayMember({ type: 'sectionSplitContent' }),
    defineArrayMember({ type: 'sectionRichText' }),
    defineArrayMember({ type: 'sectionCta' }),
    defineArrayMember({ type: 'sectionFeaturedMenu' }),
    defineArrayMember({ type: 'sectionTestimonials' }),
    defineArrayMember({ type: 'sectionFaq' }),
    defineArrayMember({ type: 'sectionTeam' }),
    defineArrayMember({ type: 'sectionImageGallery' }),
    defineArrayMember({ type: 'sectionContactForm' }),
    defineArrayMember({ type: 'sectionEmbed' }),
    defineArrayMember({ type: 'sectionMenuSection' }),
    defineArrayMember({ type: 'sectionLogoBar' }),
    defineArrayMember({ type: 'sectionStatsBar' }),
  ],
})
