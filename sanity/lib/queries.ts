import { defineQuery } from 'next-sanity'

// ─── Shared fragment: resolve all section types inside pageBuilder ───
const PAGE_BUILDER_PROJECTION = `
  pageBuilder[] {
    _type,
    _key,
    _type == "sectionHero" => {
      eyebrow, heading, subheading, image, cta, layout
    },
    _type == "sectionSplitContent" => {
      heading, body, image, imagePosition, cta
    },
    _type == "sectionRichText" => {
      body
    },
    _type == "sectionCta" => {
      heading, body, cta, backgroundImage
    },
    _type == "sectionFeaturedMenu" => {
      heading,
      items[]-> {
        _id, name, description, price, image, dietaryTags,
        category-> { name }
      }
    },
    _type == "sectionTestimonials" => {
      heading,
      testimonials[]-> {
        _id, author, quote, rating, source
      }
    },
    _type == "sectionFaq" => {
      heading,
      faqItems[]-> {
        _id, question, answer
      }
    },
    _type == "sectionTeam" => {
      heading, subheading,
      teamMembers[]-> {
        _id, name, role, image
      }
    },
    _type == "sectionImageGallery" => {
      heading,
      images[]-> {
        _id, image, alt, caption
      }
    },
    _type == "sectionContactForm" => {
      heading, subheading
    },
    _type == "sectionEmbed" => {
      heading, embedType, embedUrl, aspectRatio
    },
    _type == "sectionMenuSection" => {
      heading, description,
      "categories": *[_type == "menuCategory"] | order(order asc) {
        _id, name, menuSection, description,
        "items": *[_type == "menuItem" && references(^._id) && available != false] | order(order asc) {
          _id, name, description, price, dietaryTags
        }
      }
    },
    _type == "sectionLogoBar" => {
      heading, logos
    },
    _type == "sectionStatsBar" => {
      stats
    }
  }
`

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

// ─── Header ─────────────────────────────────────────────────────
export const HEADER_QUERY = defineQuery(`
  *[_type == "header"][0] {
    navigation,
    cta
  }
`)

// ─── Footer ─────────────────────────────────────────────────────
export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer"][0] {
    tagline,
    columns,
    copyrightText
  }
`)

// ─── Redirects ──────────────────────────────────────────────────
export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirects"][0] {
    rules
  }
`)

// ─── Home Page ──────────────────────────────────────────────────
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    ${PAGE_BUILDER_PROJECTION},
    seo
  }
`)

// ─── Page by URI ────────────────────────────────────────────────
export const PAGE_BY_URI_QUERY = defineQuery(`
  *[_type == "page" && uri == $uri][0] {
    title,
    uri,
    ${PAGE_BUILDER_PROJECTION},
    seo
  }
`)

// ─── Menu ───────────────────────────────────────────────────────
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
    "page": *[_type == "page" && (uri == "/about" || slug.current == "about")][0] {
      title,
      uri,
      ${PAGE_BUILDER_PROJECTION},
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

// ─── Generic Page (Privacy, etc.) — legacy slug support ─────────
export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    ${PAGE_BUILDER_PROJECTION},
    seo
  }
`)

// ─── Sitemap ────────────────────────────────────────────────────
export const SITEMAP_QUERY = defineQuery(`
  *[_type == "page" && (defined(uri) || defined(slug.current))] {
    "path": coalesce(uri, "/" + slug.current),
    _updatedAt
  }
`)
