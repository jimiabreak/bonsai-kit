# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bonsai Kit — a website starter built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Sanity v3**. It uses a composable **page builder** system with 14 section types, an embedded Sanity Studio at `/studio`, and Visual Editing via the Presentation API + next-sanity.

This is a **starter kit**, not a specific business's site. All content is placeholder and designed to be replaced per-client. Clients build and manage pages entirely from the CMS — no code changes needed for content updates or new pages.

## Development Commands

```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # ESLint
npm run typecheck    # TypeScript validation (tsc --noEmit)
npm run typegen      # Sanity schema extract + TypeScript type generation
npm run seed         # Seed Sanity dataset with placeholder content
```

## Architecture

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS custom properties
- **Animations:** Framer Motion
- **CMS:** Sanity v3 (embedded Studio at `/studio`, Visual Editing via Presentation API)
- **Email:** Resend (contact form)
- **Fonts:** Inter (body/UI), Playfair Display (headings/accents) via `next/font`

### Data Flow

Server components fetch data via `sanityFetch()` (from `@/sanity/lib/live`) and pass it as props to client components for interactivity. Every page fetches `siteSettings` for the Header/Footer. The contact form API writes submission documents to Sanity in parallel with sending email via Resend.

### File Structure

```
app/
├── page.tsx                  # Home (server component, uses PageBuilder)
├── layout.tsx                # Root layout (fonts, SanityLive, VisualEditing)
├── globals.css               # CSS variables + base styles
├── sitemap.ts                # Dynamic sitemap generation
├── not-found.tsx             # 404 page
├── menu/page.tsx             # Menu page
├── about/page.tsx            # About page
├── contact/page.tsx          # Contact page (form + info)
├── faq/page.tsx              # FAQ accordion page
├── privacy/page.tsx          # Privacy policy (generic page template)
├── studio/[[...tool]]/       # Embedded Sanity Studio
├── api/contact/route.ts      # Contact form API (Resend + Sanity submissions)
└── api/draft/                # Draft mode enable/disable endpoints
components/
├── layout/                   # Header, Footer, Container, MobileNav, ThemedHeader
├── ui/                       # Button, Card, MenuItem, FAQAccordion, GalleryGrid, TeamCard, TestimonialCard
├── sanity/
│   ├── SanityImage.tsx       # Sanity image component
│   ├── VisualEditing.tsx     # Visual editing integration
│   └── PageBuilder.tsx       # Maps pageBuilder sections to React components
├── sections/                 # Page Builder section components
│   ├── Hero.tsx              # sectionHero
│   ├── SplitContent.tsx      # sectionSplitContent
│   ├── RichText.tsx          # sectionRichText
│   ├── CTA.tsx               # sectionCta
│   ├── FeaturedMenu.tsx      # sectionFeaturedMenu
│   ├── Testimonials.tsx      # sectionTestimonials
│   ├── FAQ.tsx               # sectionFaq
│   ├── Team.tsx              # sectionTeam
│   ├── ImageGallery.tsx      # sectionImageGallery
│   ├── ContactForm.tsx       # sectionContactForm
│   ├── Embed.tsx             # sectionEmbed
│   ├── MenuSection.tsx       # sectionMenuSection
│   ├── LogoBar.tsx           # sectionLogoBar
│   └── StatsBar.tsx          # sectionStatsBar
└── animations/               # (empty, reserved for future use)
sanity/
├── env.ts                    # Environment variable assertions
├── lib/
│   ├── client.ts             # Sanity client instance
│   ├── image.ts              # Image URL builder
│   ├── live.ts               # sanityFetch() and SanityLive (defineLive)
│   └── queries.ts            # All GROQ queries (with PAGE_BUILDER_PROJECTION)
├── structure/
│   └── index.ts              # Custom desk structure (grouped singletons, documents, sections)
└── schemaTypes/
    ├── index.ts              # Schema registry
    ├── builders/
    │   └── pageBuilder.ts    # pageBuilder array field definition (used by homePage + page)
    ├── objects/
    │   ├── portableText.ts   # Rich text block type
    │   ├── socialLink.ts     # Social media link
    │   ├── openingHours.ts   # Business hours
    │   ├── seo.ts            # SEO metadata
    │   ├── cta.ts            # Call-to-action button object
    │   └── sections/         # Page Builder section schemas
    │       ├── sectionHero.ts
    │       ├── sectionSplitContent.ts
    │       ├── sectionRichText.ts
    │       ├── sectionCta.ts
    │       ├── sectionFeaturedMenu.ts
    │       ├── sectionTestimonials.ts
    │       ├── sectionFaq.ts
    │       ├── sectionTeam.ts
    │       ├── sectionImageGallery.ts
    │       ├── sectionContactForm.ts
    │       ├── sectionEmbed.ts
    │       ├── sectionMenuSection.ts
    │       ├── sectionLogoBar.ts
    │       └── sectionStatsBar.ts
    ├── singletons/           # siteSettings, homePage, header, footer, redirects
    └── documents/            # menuCategory, menuItem, teamMember, testimonial, faqItem, galleryImage, page, submission
lib/
└── animations.ts             # Shared Framer Motion variants
sanity.config.ts              # Sanity Studio configuration (structureTool, presentationTool, visionTool)
```

## Key Patterns

### Server/Client Component Split

- **Server components** (page.tsx files): data fetching with `sanityFetch()`, SEO metadata, layout composition
- **Client components** (marked `"use client"`): interactivity (forms, tabs, accordions, animations)
- **Pattern:** server component fetches data and passes it as props to a client component

```tsx
// app/menu/page.tsx (server)
const [{ data: settings }, { data: menu }] = await Promise.all([
  sanityFetch({ query: SITE_SETTINGS_QUERY }),
  sanityFetch({ query: MENU_QUERY }),
]);
return (
  <>
    <Header siteSettings={settings} />
    <MenuContent categories={menu?.categories || []} />
    <Footer siteSettings={settings} />
  </>
);
```

### Adding a New Page

1. Create `app/[page-name]/page.tsx` as a server component
2. Add a GROQ query to `sanity/lib/queries.ts`
3. Fetch data with `sanityFetch()` from `@/sanity/lib/live`
4. Fetch `SITE_SETTINGS_QUERY` for Header/Footer
5. Create a client component if the page needs interactivity

### Adding a New Sanity Schema

1. Create the schema file in the appropriate directory:
   - `sanity/schemaTypes/documents/` for document types (multiple entries)
   - `sanity/schemaTypes/singletons/` for singleton documents (one of each)
   - `sanity/schemaTypes/objects/` for reusable object types
2. Register it in `sanity/schemaTypes/index.ts`
3. Add GROQ queries to `sanity/lib/queries.ts`
4. Run `npm run typegen` to regenerate TypeScript types

### Page Builder Pattern

Pages use a modular `pageBuilder` field (array of section objects) that is rendered by a single `<PageBuilder sections={page?.pageBuilder} />` component.

**How it works:**

1. In Sanity, `homePage` and `page` documents include a `pageBuilder` field (defined in `sanity/schemaTypes/builders/pageBuilder.ts`) — an array of typed section objects.
2. GROQ queries use a shared `PAGE_BUILDER_PROJECTION` fragment to resolve all section types and their referenced data.
3. The `PageBuilder` component (`components/sanity/PageBuilder.tsx`) maps each section's `_type` to the corresponding React component.

**Adding a new section:**

1. Create the schema in `sanity/schemaTypes/objects/sections/sectionMySection.ts`
2. Register it in `sanity/schemaTypes/index.ts`
3. Add it to the `pageBuilder` array in `sanity/schemaTypes/builders/pageBuilder.ts`
4. Add its projection to `PAGE_BUILDER_PROJECTION` in `sanity/lib/queries.ts`
5. Create the React component in `components/sections/MySection.tsx`
6. Register the component mapping in `components/sanity/PageBuilder.tsx`
7. Add the TypeScript interface in `types/index.ts` and add it to the `PageBuilderSection` union
8. Run `npm run typegen` to regenerate Sanity types

```tsx
// Usage in a page server component
import PageBuilder from "@/components/sanity/PageBuilder";

export default async function SomePage() {
  const { data: page } = await sanityFetch({ query: SOME_PAGE_QUERY });
  return <PageBuilder sections={page?.pageBuilder} />;
}
```

### Animation Pattern

Import shared variants from `@/lib/animations` and use with Framer Motion:

```tsx
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Parent uses staggerContainer, children use fadeInUp
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.div variants={fadeInUp}>Child 1</motion.div>
  <motion.div variants={fadeInUp}>Child 2</motion.div>
</motion.div>;
```

Available variants: `fadeInUp`, `fadeIn`, `staggerContainer`, `pageTransition`

## Color System

CSS variables defined in `app/globals.css`, mapped to Tailwind in `tailwind.config.ts`:

| Variable                   | Value     | Tailwind Class               |
| -------------------------- | --------- | ---------------------------- |
| `--color-background`       | `#FAFAF8` | `bg-background`              |
| `--color-foreground`       | `#1A1A1A` | `text-foreground`            |
| `--color-primary`          | `#B8860B` | `bg-primary`, `text-primary` |
| `--color-primary-light`    | `#D4A843` | `bg-primary-light`           |
| `--color-muted`            | `#F5F5F0` | `bg-muted`                   |
| `--color-muted-foreground` | `#737373` | `text-muted-foreground`      |
| `--color-border`           | `#E5E5E0` | `border-border`              |

## Fonts

Loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables:

- **`font-sans`** (Inter) -- body text, UI elements
- **`font-serif`** (Playfair Display) -- headings, accent text

## Environment Variables

| Variable                         | Required | Description                                            |
| -------------------------------- | -------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Yes      | Sanity project ID (from sanity.io/manage)              |
| `NEXT_PUBLIC_SANITY_DATASET`     | Yes      | Sanity dataset name (usually `production`)             |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No       | Sanity API version (default: `2024-01-01`)             |
| `SANITY_API_READ_TOKEN`          | Yes      | Sanity read token (for live preview + fetching)        |
| `SANITY_API_WRITE_TOKEN`         | Yes      | Sanity write token (form submissions + `npm run seed`) |
| `RESEND_API_KEY`                 | Contact  | Resend API key (for contact form emails)               |
| `CONTACT_EMAIL_TO`               | Contact  | Destination email for contact form submissions         |
| `CONTACT_EMAIL_FROM`             | Contact  | Sender address for contact form emails                 |
| `NEXT_PUBLIC_SITE_URL`           | No       | Production URL (used in sitemap, SEO)                  |
| `NEXT_PUBLIC_GA_ID`              | No       | Google Analytics measurement ID                        |

See `.env.local.example` for the full template.

## Testing Checklist

- Mobile responsive (320px minimum)
- Keyboard navigation works
- Images have alt text
- Contact form validates inputs
- SEO meta tags present on every page
- Lighthouse score 95+ target (all categories)
- Visual Editing works in Sanity Studio (Presentation tool)
