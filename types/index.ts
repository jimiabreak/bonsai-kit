import type { PortableTextBlock as PTBlock } from '@portabletext/types'

// =============================================================================
// Sanity Helper Types
// =============================================================================

/** Sanity slug field */
export interface SanitySlug {
  _type: 'slug'
  current: string
}

/** Sanity reference to another document */
export interface SanityReference {
  _ref: string
  _type: 'reference'
}

/** Sanity image with optional hotspot */
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: { top: number; bottom: number; left: number; right: number }
}

/** Sanity geopoint */
export interface SanityGeopoint {
  _type: 'geopoint'
  lat: number
  lng: number
  alt?: number
}

/** Portable Text block content (array of Sanity block nodes) */
export type PortableTextBlock = PTBlock[]

// =============================================================================
// Sanity Object Types (shared building blocks)
// =============================================================================

/** Social media link — matches sanity/schemaTypes/objects/socialLink.ts */
export interface SocialLink {
  _type: 'socialLink'
  _key: string
  platform: 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'yelp' | 'google' | 'youtube'
  url: string
}

/** Opening hours for a single day — matches sanity/schemaTypes/objects/openingHours.ts */
export interface OpeningHours {
  _type: 'openingHours'
  _key: string
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  openTime?: string
  closeTime?: string
  closed?: boolean
}

/** SEO metadata — matches sanity/schemaTypes/objects/seo.ts */
export interface SEO {
  _type: 'seo'
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

/** Physical address (inline object on siteSettings) */
export interface Address {
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

// =============================================================================
// Sanity Singleton Documents
// =============================================================================

/** Site Settings — matches sanity/schemaTypes/singletons/siteSettings.ts */
export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  name: string
  tagline?: string
  logo?: SanityImage
  logoAlt?: SanityImage
  phone?: string
  email?: string
  address?: Address
  location?: SanityGeopoint
  hours?: OpeningHours[]
  socialLinks?: SocialLink[]
  reservationUrl?: string
  seo?: SEO
}

/** Home Page — with pageBuilder */
export interface HomePage {
  _id: string
  _type: 'homePage'
  pageBuilder?: PageBuilderSection[]
  seo?: SEO
}

// =============================================================================
// Sanity Document Types
// =============================================================================

/** Menu Category — matches sanity/schemaTypes/documents/menuCategory.ts */
export interface MenuCategory {
  _id: string
  _type: 'menuCategory'
  name: string
  slug: SanitySlug
  description?: string
  menuSection: 'food' | 'drinks' | 'desserts'
  order: number
  /** Populated by GROQ query (not stored on the document itself) */
  items?: MenuItem[]
}

/** Menu Item — matches sanity/schemaTypes/documents/menuItem.ts */
export interface MenuItem {
  _id: string
  _type: 'menuItem'
  name: string
  description?: string
  price: string
  image?: SanityImage
  category: SanityReference | MenuCategory
  dietaryTags?: ('V' | 'VG' | 'GF' | 'GFA' | 'DF' | 'N' | 'S')[]
  featured?: boolean
  available?: boolean
  order?: number
}

/** Team Member — matches sanity/schemaTypes/documents/teamMember.ts */
export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  role?: string
  bio?: PortableTextBlock
  image: SanityImage
  order?: number
}

/** Testimonial — matches sanity/schemaTypes/documents/testimonial.ts */
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  author: string
  quote: string
  rating?: number
  source?: string
  date?: string
}

/** FAQ Item — matches sanity/schemaTypes/documents/faqItem.ts */
export interface FAQItem {
  _id: string
  _type: 'faqItem'
  question: string
  answer: PortableTextBlock
  category?: string
  order?: number
}

/** Gallery Image — matches sanity/schemaTypes/documents/galleryImage.ts */
export interface GalleryImage {
  _id: string
  _type: 'galleryImage'
  image: SanityImage
  alt: string
  caption?: string
  order?: number
}

/** Generic Page — with pageBuilder + uri */
export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug?: SanitySlug
  uri?: string
  pageBuilder?: PageBuilderSection[]
  seo?: SEO
}

// =============================================================================
// Section Types (Page Builder)
// =============================================================================

/** CTA (call to action) button object */
export interface CTA {
  _type: 'cta'
  label: string
  href: string
}

/** Hero section */
export interface SectionHero {
  _type: 'sectionHero'
  _key: string
  eyebrow?: string
  heading: string
  subheading?: string
  image?: SanityImage
  cta?: CTA
  layout?: 'centered' | 'left' | 'split'
}

/** Split content section */
export interface SectionSplitContent {
  _type: 'sectionSplitContent'
  _key: string
  heading?: string
  body?: PortableTextBlock
  image?: SanityImage
  imagePosition?: 'left' | 'right'
  cta?: CTA
}

/** Rich text section */
export interface SectionRichText {
  _type: 'sectionRichText'
  _key: string
  body: PortableTextBlock
}

/** CTA section */
export interface SectionCta {
  _type: 'sectionCta'
  _key: string
  heading?: string
  body?: string
  cta?: CTA
  backgroundImage?: SanityImage
}

/** Featured menu section */
export interface SectionFeaturedMenu {
  _type: 'sectionFeaturedMenu'
  _key: string
  heading?: string
  items?: MenuItem[]
}

/** Testimonials section */
export interface SectionTestimonials {
  _type: 'sectionTestimonials'
  _key: string
  heading?: string
  testimonials?: Testimonial[]
}

/** FAQ section */
export interface SectionFaq {
  _type: 'sectionFaq'
  _key: string
  heading?: string
  faqItems?: FAQItem[]
}

/** Team section */
export interface SectionTeam {
  _type: 'sectionTeam'
  _key: string
  heading?: string
  subheading?: string
  teamMembers?: TeamMember[]
}

/** Image gallery section */
export interface SectionImageGallery {
  _type: 'sectionImageGallery'
  _key: string
  heading?: string
  images?: GalleryImage[]
}

/** Contact form section */
export interface SectionContactForm {
  _type: 'sectionContactForm'
  _key: string
  heading?: string
  subheading?: string
}

/** Embed section */
export interface SectionEmbed {
  _type: 'sectionEmbed'
  _key: string
  heading?: string
  embedType?: 'video' | 'map' | 'custom'
  embedUrl?: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16'
}

/** Full menu section */
export interface SectionMenuSection {
  _type: 'sectionMenuSection'
  _key: string
  heading?: string
  description?: string
  categories?: MenuCategory[]
}

/** Logo bar section */
export interface SectionLogoBar {
  _type: 'sectionLogoBar'
  _key: string
  heading?: string
  logos?: Array<SanityImage & { alt?: string }>
}

/** Stats bar section */
export interface SectionStatsBar {
  _type: 'sectionStatsBar'
  _key: string
  stats?: Array<{ _key: string; number: string; label: string }>
}

/** Union of all section types */
export type PageBuilderSection =
  | SectionHero
  | SectionSplitContent
  | SectionRichText
  | SectionCta
  | SectionFeaturedMenu
  | SectionTestimonials
  | SectionFaq
  | SectionTeam
  | SectionImageGallery
  | SectionContactForm
  | SectionEmbed
  | SectionMenuSection
  | SectionLogoBar
  | SectionStatsBar

// =============================================================================
// Global Config Types
// =============================================================================

/** Header singleton */
export interface Header {
  _id: string
  _type: 'header'
  navigation?: Array<{ _key: string; label: string; href: string }>
  cta?: CTA
}

/** Footer singleton */
export interface Footer {
  _id: string
  _type: 'footer'
  tagline?: string
  columns?: Array<{
    _key: string
    title: string
    links?: Array<{ _key: string; label: string; href: string }>
  }>
  copyrightText?: string
}

/** Redirects singleton */
export interface Redirects {
  _id: string
  _type: 'redirects'
  rules?: Array<{
    _key: string
    source: string
    destination: string
    permanent?: boolean
  }>
}

/** Submission document */
export interface Submission {
  _id: string
  _type: 'submission'
  name?: string
  email?: string
  phone?: string
  message?: string
  page?: string
  source?: string
  submittedAt?: string
}

// =============================================================================
// Component Props Types
// =============================================================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outline'
}

// =============================================================================
// Navigation Types
// =============================================================================

export interface NavLink {
  label: string
  href: string
  external?: boolean
}
