import { defineQuery } from 'next-sanity'

// ─── Site Settings ──────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    logo,
    logoAlt,
    phone,
    email,
    address,
    location,
    hours,
    socialLinks,
    reservationUrl,
    seo
  }
`)

// ─── Home Page ──────────────────────────────────────────────────
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    hero,
    aboutPreview {
      heading,
      body,
      image
    },
    featuredMenuHeading,
    featuredMenuItems[]-> {
      _id,
      name,
      description,
      price,
      image,
      dietaryTags,
      category-> { name }
    },
    testimonialHeading,
    featuredTestimonials[]-> {
      _id,
      author,
      quote,
      rating,
      source
    },
    ctaSection
  }
`)

// ─── Menu ───────────────────────────────────────────────────────
// Fetches all categories with their items, grouped by menuSection
export const MENU_QUERY = defineQuery(`
  {
    "categories": *[_type == "menuCategory"] | order(order asc) {
      _id,
      name,
      slug,
      description,
      menuSection,
      "items": *[_type == "menuItem" && references(^._id) && available != false] | order(order asc) {
        _id,
        name,
        description,
        price,
        image,
        dietaryTags
      }
    }
  }
`)

// ─── About Page ─────────────────────────────────────────────────
export const ABOUT_PAGE_QUERY = defineQuery(`
  {
    "page": *[_type == "page" && slug.current == "about"][0] {
      title,
      body,
      seo
    },
    "team": *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      bio,
      image
    },
    "gallery": *[_type == "galleryImage"] | order(order asc) {
      _id,
      image,
      alt,
      caption
    }
  }
`)

// ─── FAQ ────────────────────────────────────────────────────────
export const FAQ_QUERY = defineQuery(`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`)

// ─── Generic Page (Privacy, etc.) ───────────────────────────────
export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    body,
    seo
  }
`)

// ─── Sitemap ────────────────────────────────────────────────────
export const SITEMAP_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`)
