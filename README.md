# Bonsai Kit

A modern, Sanity-powered website template built with Next.js 14, TypeScript, and Tailwind CSS. Designed to get a business online fast with a beautiful, responsive site and a CMS that non-technical staff can manage.

## Features

- **Composable page builder** -- 14 drag-and-drop section types; clients build pages without code
- **Sanity CMS** -- structured content management with an embedded studio at `/studio`
- **Visual Editing** -- real-time preview via Sanity's Presentation API and draft mode
- **Custom desk structure** -- organized sidebar (Homepage, Pages, Menu, Content Library, Submissions, Site)
- **Form submissions in CMS** -- contact form entries stored in Sanity for client visibility
- **Responsive design** -- mobile-first layout with 44px minimum touch targets (WCAG 2.1 AA)
- **Framer Motion animations** -- subtle, accessible animations that respect `prefers-reduced-motion`
- **Contact form** -- server-side email delivery via Resend with parallel Sanity submission storage
- **Dynamic sitemap** -- auto-generated from static routes and Sanity pages
- **SEO-ready** -- per-page meta tags, Open Graph support, and structured data
- **TypeScript** -- strict mode with auto-generated Sanity types via `typegen`
- **Tailwind CSS** -- CSS variable theming for easy brand customization
- **Menu system** -- tabbed menu with categories, dietary tags, pricing variants, and 86'd item support

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 14 (App Router)                 |
| Language   | TypeScript (strict)                     |
| CMS        | Sanity v3 + next-sanity                 |
| Styling    | Tailwind CSS with CSS variable theming  |
| Animations | Framer Motion                           |
| Email      | Resend                                  |
| Fonts      | Inter (sans) + Playfair Display (serif) |
| Deployment | Vercel (recommended)                    |

## Quick Start

### Prerequisites

- Node.js 18+
- A [Sanity.io](https://sanity.io) account (free tier works)
- A [Resend](https://resend.com) API key (for the contact form)

### Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-org/bonsai-kit.git
   cd bonsai-kit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a Sanity project**

   Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project, or run:

   ```bash
   npx sanity init
   ```

   Note the **Project ID** and **Dataset** name (usually `production`).

4. **Configure environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Open `.env.local` and fill in your values. See the [Environment Variables](#environment-variables) section for details.

5. **Seed sample content** (optional)

   ```bash
   npm run seed
   ```

   This populates your Sanity dataset with sample menu items, FAQ entries, and other starter content so you can see the site in action immediately.

6. **Start the dev server**

   ```bash
   npm run dev
   ```

7. **Open in your browser**
   - Website: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

```
bonsai-kit/
├── app/
│   ├── page.tsx                  # Home page (server, renders PageBuilder)
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── globals.css               # CSS variables & base styles
│   ├── sitemap.ts                # Dynamic sitemap generator
│   ├── not-found.tsx             # Custom 404 page
│   ├── about/page.tsx            # About page
│   ├── menu/page.tsx             # Menu page
│   ├── contact/page.tsx          # Contact page
│   ├── faq/page.tsx              # FAQ page
│   ├── privacy/page.tsx          # Privacy policy page
│   ├── studio/[[...tool]]/       # Embedded Sanity Studio
│   └── api/
│       ├── contact/route.ts      # Contact form endpoint (Resend + Sanity)
│       └── draft/                # Draft mode enable/disable
├── components/
│   ├── layout/                   # Header, Footer, MobileNav, Container
│   ├── ui/                       # Button, Card, MenuItem, FAQAccordion, etc.
│   ├── sanity/
│   │   ├── SanityImage.tsx       # Sanity image component
│   │   ├── VisualEditing.tsx     # Visual editing integration
│   │   └── PageBuilder.tsx       # Maps pageBuilder sections → React components
│   ├── sections/                 # Page Builder section components (14 types)
│   │   ├── Hero.tsx, SplitContent.tsx, RichText.tsx, CTA.tsx,
│   │   ├── FeaturedMenu.tsx, Testimonials.tsx, FAQ.tsx, Team.tsx,
│   │   ├── ImageGallery.tsx, ContactForm.tsx, Embed.tsx,
│   │   └── MenuSection.tsx, LogoBar.tsx, StatsBar.tsx
│   └── animations/               # Framer Motion wrappers
├── sanity/
│   ├── env.ts                    # Sanity environment config
│   ├── structure/index.ts        # Custom desk structure (sidebar groups)
│   ├── schemaTypes/
│   │   ├── index.ts              # Schema registry
│   │   ├── builders/pageBuilder.ts  # pageBuilder field (used by homePage + page)
│   │   ├── singletons/           # siteSettings, homePage, header, footer, redirects
│   │   ├── documents/            # menuCategory, menuItem, teamMember, etc. + submission
│   │   └── objects/
│   │       ├── portableText, socialLink, openingHours, seo, cta
│   │       └── sections/         # 14 section schemas (sectionHero, sectionCta, etc.)
│   └── lib/
│       ├── client.ts             # Sanity client (read + write)
│       ├── image.ts              # Image URL builder
│       ├── live.ts               # sanityFetch() and SanityLive
│       └── queries.ts            # GROQ queries + PAGE_BUILDER_PROJECTION
├── lib/animations.ts             # Framer Motion animation variants
├── types/index.ts                # Shared TypeScript types
├── sanity.config.ts              # Sanity Studio config (structureTool, presentationTool)
├── tailwind.config.ts            # Tailwind + design tokens
└── .env.local.example            # Environment variable template
```

## Sanity Schemas

### Singletons (one per project)

| Document         | Purpose                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| **siteSettings** | Business name, logo, address, phone, hours, social links, reservation URL, default SEO |
| **homePage**     | Homepage with composable page builder sections + SEO                                   |
| **header**       | Navigation links + optional CTA button                                                 |
| **footer**       | Tagline, link columns, copyright text                                                  |
| **redirects**    | Source/destination redirect rules (301 permanent / 307 temporary)                      |

### Documents (multiple entries)

| Document         | Purpose                                                                            |
| ---------------- | ---------------------------------------------------------------------------------- |
| **page**         | CMS pages with URI routing, page builder sections, and SEO                         |
| **menuCategory** | Menu sections (Food, Drinks, Desserts) with sort order                             |
| **menuItem**     | Individual items with price, dietary tags, category reference, availability toggle |
| **teamMember**   | Staff bios with photo and role                                                     |
| **testimonial**  | Customer reviews with rating, source, and date                                     |
| **faqItem**      | Question/answer pairs with optional category grouping                              |
| **galleryImage** | Photo gallery images with alt text and captions                                    |
| **submission**   | Contact form entries (read-only, stored via API)                                   |

### Section Types (page builder blocks)

| Section                 | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| **sectionHero**         | Hero with eyebrow, heading, image, CTA (3 layouts)    |
| **sectionSplitContent** | Text + image side by side (left/right position)       |
| **sectionRichText**     | Portable Text body content                            |
| **sectionCta**          | Call-to-action banner with optional background        |
| **sectionFeaturedMenu** | Featured menu items (max 6 references)                |
| **sectionTestimonials** | Testimonial cards (max 6 references)                  |
| **sectionFaq**          | FAQ accordion with referenced faqItems                |
| **sectionTeam**         | Team member grid                                      |
| **sectionImageGallery** | Image gallery grid                                    |
| **sectionContactForm**  | Contact form (heading + subheading, form is frontend) |
| **sectionEmbed**        | Video/map/custom iframe embed                         |
| **sectionMenuSection**  | Full menu with tabbed categories                      |
| **sectionLogoBar**      | Logo row (partner/client logos)                       |
| **sectionStatsBar**     | Number + label stat items                             |

### Object Types (reusable building blocks)

| Object           | Used for                                           |
| ---------------- | -------------------------------------------------- |
| **portableText** | Rich text content (headings, lists, links, images) |
| **cta**          | Call-to-action button (label + href)               |
| **socialLink**   | Social media platform + URL pairs                  |
| **openingHours** | Day-of-week hours (used in siteSettings)           |
| **seo**          | Title, description, and OG image for any page      |

## Customization

### Change Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --color-background: #fafaf8; /* Page background */
  --color-foreground: #1a1a1a; /* Body text */
  --color-primary: #b8860b; /* Accent / buttons (warm gold) */
  --color-primary-light: #d4a843; /* Hover state for primary */
  --color-muted: #f5f5f0; /* Secondary backgrounds */
  --color-muted-foreground: #737373; /* Secondary text */
  --color-border: #e5e5e0; /* Borders and dividers */
}
```

These variables are mapped to Tailwind classes in `tailwind.config.ts`, so you can use `bg-primary`, `text-muted-foreground`, etc. throughout the codebase.

### Change Fonts

Edit the font imports in `app/layout.tsx`:

```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
```

Replace `Inter` and `Playfair_Display` with any [Google Font](https://fonts.google.com). The `--font-sans` variable is used for body text and `--font-serif` for headings.

### Add a New Page

The easiest way is through Sanity Studio — create a new **Page** document, set its URI (e.g. `/services`), and add sections via the page builder. No code changes needed.

For pages with custom server-side logic:

1. Create `app/your-page/page.tsx` as a server component
2. Fetch content with `sanityFetch()` and render with `<PageBuilder sections={page?.pageBuilder} />`
3. The page will be picked up automatically by the dynamic sitemap

### Add Menu Sections

The menu is organized by sections (tabs) and categories. To add a new section:

1. Open `sanity/schemaTypes/documents/menuCategory.ts`
2. Add a new option to the `menuSection` field's `list` array:

   ```ts
   { title: 'Brunch', value: 'brunch' }
   ```

3. Update the menu page component to include a tab for the new section
4. Create categories and menu items in Sanity Studio, assigning them to the new section

## Environment Variables

| Variable                         | Required | Description                                                                |
| -------------------------------- | -------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Yes      | Sanity project ID from [sanity.io/manage](https://sanity.io/manage)        |
| `NEXT_PUBLIC_SANITY_DATASET`     | Yes      | Sanity dataset name (default: `production`)                                |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No       | Sanity API version (default: `2024-01-01`)                                 |
| `SANITY_API_READ_TOKEN`          | Yes      | Sanity API token with read access (for draft mode and server-side queries) |
| `SANITY_API_WRITE_TOKEN`         | Yes      | Sanity API token with write access (for form submissions + seeding)        |
| `RESEND_API_KEY`                 | Yes      | Resend API key for sending contact form emails                             |
| `CONTACT_EMAIL_TO`               | Yes      | Email address that receives contact form submissions                       |
| `CONTACT_EMAIL_FROM`             | Yes      | Sender address for contact form emails (must be verified in Resend)        |
| `NEXT_PUBLIC_SITE_URL`           | No       | Production URL (used in sitemap and OG tags)                               |
| `NEXT_PUBLIC_GA_ID`              | No       | Google Analytics measurement ID                                            |

## Scripts

| Command             | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the development server                         |
| `npm run build`     | Create an optimized production build                 |
| `npm run start`     | Start the production server                          |
| `npm run lint`      | Run ESLint                                           |
| `npm run typecheck` | Run TypeScript type checking                         |
| `npm run typegen`   | Extract Sanity schemas and generate TypeScript types |
| `npm run seed`      | Seed Sanity dataset with sample content              |

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Add all [required environment variables](#environment-variables) in the Vercel project settings
4. Deploy

Vercel will automatically:

- Build and deploy on every push to `main`
- Create preview deployments for pull requests
- Handle edge caching and CDN distribution

### Other Platforms

This is a standard Next.js app. Any platform that supports Next.js 14 will work (Netlify, Railway, etc.). Make sure to:

- Set all required environment variables
- Use `npm run build` as the build command
- Use `npm run start` as the start command

## License

MIT
