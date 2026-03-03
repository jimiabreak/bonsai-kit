// Object types (shared building blocks)
import portableText from './objects/portableText'
import socialLink from './objects/socialLink'
import openingHours from './objects/openingHours'
import seo from './objects/seo'
import cta from './objects/cta'

// Section types (page builder blocks)
import sectionHero from './objects/sections/sectionHero'
import sectionSplitContent from './objects/sections/sectionSplitContent'
import sectionRichText from './objects/sections/sectionRichText'
import sectionCta from './objects/sections/sectionCta'
import sectionFeaturedMenu from './objects/sections/sectionFeaturedMenu'
import sectionTestimonials from './objects/sections/sectionTestimonials'
import sectionFaq from './objects/sections/sectionFaq'
import sectionTeam from './objects/sections/sectionTeam'
import sectionImageGallery from './objects/sections/sectionImageGallery'
import sectionContactForm from './objects/sections/sectionContactForm'
import sectionEmbed from './objects/sections/sectionEmbed'
import sectionMenuSection from './objects/sections/sectionMenuSection'
import sectionLogoBar from './objects/sections/sectionLogoBar'
import sectionStatsBar from './objects/sections/sectionStatsBar'

// Singleton documents (one of each)
import siteSettings from './singletons/siteSettings'
import homePage from './singletons/homePage'

// Document types (multiple entries)
import menuCategory from './documents/menuCategory'
import menuItem from './documents/menuItem'
import teamMember from './documents/teamMember'
import testimonial from './documents/testimonial'
import faqItem from './documents/faqItem'
import galleryImage from './documents/galleryImage'
import page from './documents/page'

export const schemaTypes = [
  // Objects
  portableText,
  socialLink,
  openingHours,
  seo,
  cta,
  // Sections
  sectionHero,
  sectionSplitContent,
  sectionRichText,
  sectionCta,
  sectionFeaturedMenu,
  sectionTestimonials,
  sectionFaq,
  sectionTeam,
  sectionImageGallery,
  sectionContactForm,
  sectionEmbed,
  sectionMenuSection,
  sectionLogoBar,
  sectionStatsBar,
  // Singletons
  siteSettings,
  homePage,
  // Documents
  menuCategory,
  menuItem,
  teamMember,
  testimonial,
  faqItem,
  galleryImage,
  page,
]
