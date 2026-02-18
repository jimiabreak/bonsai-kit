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
}

/** Sanity geopoint */
export interface SanityGeopoint {
  _type: 'geopoint'
  lat: number
  lng: number
  alt?: number
}

/** Portable Text block content (array of Sanity block nodes) */
export type PortableTextBlock = any[]

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

/** Home Page — matches sanity/schemaTypes/singletons/homePage.ts */
export interface HomePage {
  _id: string
  _type: 'homePage'
  hero?: {
    heading: string
    subheading?: string
    image?: SanityImage
    ctaText?: string
    ctaLink?: string
  }
  aboutPreview?: {
    heading?: string
    body?: PortableTextBlock
    image?: SanityImage
  }
  featuredMenuHeading?: string
  featuredMenuItems?: SanityReference[] | MenuItem[]
  testimonialHeading?: string
  featuredTestimonials?: SanityReference[] | Testimonial[]
  ctaSection?: {
    heading?: string
    body?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: SanityImage
  }
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

/** Generic Page — matches sanity/schemaTypes/documents/page.ts */
export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug: SanitySlug
  body?: PortableTextBlock
  seo?: SEO
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
