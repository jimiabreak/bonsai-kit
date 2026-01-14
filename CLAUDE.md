This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Project Overview
Commonwealth Coffee website - a modern, performant site for a specialty coffee roaster featuring a menu system, subscription service integration, and content management via JSON/Markdown files.
Development Commands
bash# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Type checking
npm run type-check
Architecture
Tech Stack

Framework: Next.js 14+ (App Router)
Language: TypeScript (strict mode)
Styling: Tailwind CSS (custom design tokens)
Animations: Framer Motion
Content: File-based (JSON/Markdown)
Fonts: Inria Sans, Inria Serif
Images: Next.js Image Optimization
Deployment: Vercel/Netlify
E-commerce: Shopify (headless, subscriptions only)

Project Structure
commonwealth-coffee/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx              # Home page
│   │   ├── menu/
│   │   │   └── page.tsx          # Menu with tabs
│   │   ├── info/
│   │   │   └── page.tsx          # About/Info page
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact + hours
│   │   ├── faq/
│   │   │   └── page.tsx          # FAQ accordion
│   │   ├── subscription/
│   │   │   └── page.tsx          # Shopify subscriptions
│   │   └── events/
│   │       └── page.tsx          # Events listing
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Loading states
│   ├── error.tsx                 # Error boundary
│   └── not-found.tsx            # 404 page
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   ├── MobileNav.tsx        # Hamburger menu
│   │   └── Container.tsx        # Layout wrapper
│   ├── ui/
│   │   ├── Button.tsx           # Button variants
│   │   ├── Card.tsx             # Content cards
│   │   ├── MenuItem.tsx         # Menu item display
│   │   ├── Tabs.tsx             # Tab navigation
│   │   └── Accordion.tsx        # FAQ items
│   └── animations/
│       ├── PageTransition.tsx   # Page animations
│       ├── FadeIn.tsx           # Scroll triggers
│       └── StaggerList.tsx      # List animations
├── content/
│   ├── menu.json                # Menu data (quarterly updates)
│   ├── home.json                # Homepage content
│   ├── info.md                  # About page markdown
│   ├── faq.json                 # FAQ questions
│   └── contact.json             # Contact info
├── lib/
│   ├── shopify.ts               # Shopify API client
│   ├── content.ts               # Content helpers
│   ├── animations.ts            # Framer variants
│   └── utils.ts                 # Utility functions
├── public/
│   ├── fonts/                   # Local fonts (if any)
│   ├── images/                  # Static images
│   └── favicon.ico              # Favicon
└── types/
    └── index.ts                 # TypeScript definitions
Data Flow
Content Management:

Static content from /content directory
JSON for structured data (menu, FAQ)
Markdown for long-form content (info page)
Git-based updates (push to deploy)

Menu Updates (Quarterly):
json// content/menu.json structure
{
  "lastUpdated": "2025-Q1",
  "tabs": {
    "food": {
      "categories": [...],
      "items": [...]
    },
    "drinks": {...},
    "features": {...}
  }
}
Shopify Integration (Phase 2):

Minimal integration for subscriptions only
Customer portal handled by Shopify
No auth/account management needed

Key Design Patterns
Component Architecture

Atomic Design: Small, composable components
Mobile-First: All components responsive by default
Accessibility: ARIA labels, keyboard navigation, 44px touch targets

Performance Strategy

Static Generation: Pre-render all pages
Image Optimization: next/image with blur placeholders
Code Splitting: Automatic per-route
Font Loading: Optimized with next/font
Animation Performance: CSS transforms only, respect prefers-reduced-motion

Styling Approach
css/* Design tokens from brand */
:root {
  --color-cream: #F8F4E6;
  --color-dark: #2C2C2C;
  --font-sans: 'Inria Sans';
  --font-serif: 'Inria Serif';
}
Content Update Workflow
For Menu Updates:

Edit /content/menu.json
Set "new": true for new items
Update prices and descriptions
Commit and push to trigger deploy

For Page Content:

Edit relevant file in /content/
Markdown supports frontmatter
JSON for structured data
Changes live after deploy (~2 min)

Performance Targets

Lighthouse Score: 95+ all metrics
First Contentful Paint: < 1.5s
Time to Interactive: < 3.5s
Cumulative Layout Shift: < 0.1

Development Guidelines
Component Creation:
tsx// Always typed, always accessible
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({ 
  variant = 'primary',
  children,
  ...props 
}: ButtonProps) {
  // Implementation
}
Animation Guidelines:
tsx// Use Framer Motion sparingly
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Always respect user preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
Content Fetching:
tsx// Simple file reading for content
import menuData from '@/content/menu.json';
import { readFile } from 'fs/promises';

// No complex CMS, just files
const content = await readFile('content/info.md', 'utf-8');
Testing Checklist

 Mobile responsive (320px minimum)
 Keyboard navigation works
 Images have alt text
 Forms have validation
 Loading states present
 Error boundaries catch failures
 SEO meta tags complete
 Sitemap generated

Deployment
Environment Variables:
env# .env.local (add in Phase 2)
NEXT_PUBLIC_SHOPIFY_DOMAIN=
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=
Build Process:

npm run build - Creates optimized production build
Deploy to Vercel/Netlify
Set environment variables in hosting platform
Enable ISR if needed for dynamic content

Important Notes

CMS: Content managed via sanity please see [text](agents/headless-shopify-agent.md) 
No Auth: Shopify handles all customer accounts
Mobile-First: Every component starts at 320px
Accessibility: WCAG 2.1 AA compliance required
Performance: Core Web Vitals are critical metrics

Quick Commands
bash# Development
npm run dev           # Start dev server

# Content Updates
npm run update:menu   # Helper script for menu updates

# Production
npm run build        # Build for production
npm run start        # Start production server

# Quality
npm run lint         # Check code quality
npm run type-check   # TypeScript validation