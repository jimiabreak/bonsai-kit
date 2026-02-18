// Object types (shared building blocks)
import portableText from './objects/portableText'
import socialLink from './objects/socialLink'
import openingHours from './objects/openingHours'
import seo from './objects/seo'

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
