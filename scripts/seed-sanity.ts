/**
 * Sanity Seed Script
 *
 * Creates placeholder content in Sanity so the studio isn't empty on first run.
 * Safe to run multiple times — uses createOrReplace with deterministic _id values.
 *
 * Usage:
 *   npm run seed
 *
 * Requires:
 *   SANITY_API_WRITE_TOKEN in .env.local
 *   NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 *   NEXT_PUBLIC_SANITY_DATASET in .env.local
 */

import dotenv from 'dotenv'
import { createClient } from 'next-sanity'

// Load .env.local
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables.')
  console.error('Ensure .env.local contains:')
  console.error('  NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('  NEXT_PUBLIC_SANITY_DATASET')
  console.error('  SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a portable text block from a plain string. */
function textBlock(text: string, key: string, style: string = 'normal'): object {
  return {
    _type: 'block',
    _key: key,
    style,
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
    markDefs: [],
  }
}

/** Create multiple portable text blocks from an array of strings. */
function textBlocks(paragraphs: string[], keyPrefix: string): object[] {
  return paragraphs.map((text, i) => textBlock(text, `${keyPrefix}-${i}`))
}

/** Create a heading block. */
function headingBlock(text: string, key: string, level: 'h2' | 'h3' | 'h4' = 'h2'): object {
  return textBlock(text, key, level)
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

// --- Site Settings ---
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: 'The Restaurant',
  tagline: 'Fine dining, redefined.',
  phone: '555-123-4567',
  email: 'hello@therestaurant.com',
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'US',
  },
  hours: [
    { _type: 'openingHours', _key: 'mon', day: 'Monday', openTime: '11:00 AM', closeTime: '10:00 PM', closed: false },
    { _type: 'openingHours', _key: 'tue', day: 'Tuesday', closed: true },
    { _type: 'openingHours', _key: 'wed', day: 'Wednesday', openTime: '11:00 AM', closeTime: '10:00 PM', closed: false },
    { _type: 'openingHours', _key: 'thu', day: 'Thursday', openTime: '11:00 AM', closeTime: '10:00 PM', closed: false },
    { _type: 'openingHours', _key: 'fri', day: 'Friday', openTime: '11:00 AM', closeTime: '11:00 PM', closed: false },
    { _type: 'openingHours', _key: 'sat', day: 'Saturday', openTime: '10:00 AM', closeTime: '11:00 PM', closed: false },
    { _type: 'openingHours', _key: 'sun', day: 'Sunday', openTime: '10:00 AM', closeTime: '9:00 PM', closed: false },
  ],
  socialLinks: [
    { _type: 'socialLink', _key: 'ig', platform: 'instagram', url: 'https://instagram.com/therestaurant' },
    { _type: 'socialLink', _key: 'fb', platform: 'facebook', url: 'https://facebook.com/therestaurant' },
  ],
  reservationUrl: 'https://resy.com/cities/ny/the-restaurant',
}

// --- Home Page ---
const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    heading: 'A Culinary Experience Like No Other',
    subheading: 'Seasonal ingredients, timeless techniques, and a passion for flavor come together in every dish we create.',
    ctaText: 'View Our Menu',
    ctaLink: '/menu',
  },
  aboutPreview: {
    heading: 'Our Story',
    body: textBlocks(
      [
        'Nestled in the heart of the city, The Restaurant has been serving unforgettable meals since 2010. Our philosophy is simple: source the finest ingredients, treat them with respect, and let their natural flavors shine.',
        'From our wood-fired kitchen to your table, every dish tells a story of craftsmanship, community, and an unwavering commitment to quality.',
      ],
      'about-preview',
    ),
  },
  featuredMenuHeading: 'From Our Kitchen',
  featuredMenuItems: [
    { _type: 'reference', _ref: 'item-bruschetta', _key: 'feat-1' },
    { _type: 'reference', _ref: 'item-grilled-salmon', _key: 'feat-2' },
    { _type: 'reference', _ref: 'item-tiramisu', _key: 'feat-3' },
    { _type: 'reference', _ref: 'item-old-fashioned', _key: 'feat-4' },
  ],
  testimonialHeading: 'What Our Guests Say',
  featuredTestimonials: [
    { _type: 'reference', _ref: 'testimonial-1', _key: 'test-1' },
    { _type: 'reference', _ref: 'testimonial-2', _key: 'test-2' },
    { _type: 'reference', _ref: 'testimonial-3', _key: 'test-3' },
  ],
  ctaSection: {
    heading: 'Reserve Your Table',
    body: 'Whether it\'s a special occasion or a weeknight treat, we\'d love to welcome you. Book your table today and experience what everyone is talking about.',
    ctaText: 'Make a Reservation',
    ctaLink: '/contact',
  },
}

// --- Menu Categories ---
const menuCategories = [
  {
    _id: 'category-appetizers',
    _type: 'menuCategory',
    name: 'Appetizers',
    slug: { _type: 'slug', current: 'appetizers' },
    description: 'Start your meal with something special.',
    menuSection: 'food',
    order: 1,
  },
  {
    _id: 'category-mains',
    _type: 'menuCategory',
    name: 'Mains',
    slug: { _type: 'slug', current: 'mains' },
    description: 'Hearty entrees crafted with seasonal ingredients.',
    menuSection: 'food',
    order: 2,
  },
  {
    _id: 'category-desserts',
    _type: 'menuCategory',
    name: 'Desserts',
    slug: { _type: 'slug', current: 'desserts' },
    description: 'The perfect ending to a perfect meal.',
    menuSection: 'desserts',
    order: 3,
  },
  {
    _id: 'category-cocktails',
    _type: 'menuCategory',
    name: 'Cocktails',
    slug: { _type: 'slug', current: 'cocktails' },
    description: 'Hand-crafted cocktails and curated spirits.',
    menuSection: 'drinks',
    order: 4,
  },
]

// --- Menu Items ---
const menuItems = [
  // Appetizers
  {
    _id: 'item-bruschetta',
    _type: 'menuItem',
    name: 'Bruschetta',
    description: 'Grilled sourdough topped with heirloom tomatoes, fresh basil, garlic, and extra virgin olive oil.',
    price: '14',
    category: { _type: 'reference', _ref: 'category-appetizers' },
    dietaryTags: ['V', 'VG'],
    featured: true,
    available: true,
    order: 1,
  },
  {
    _id: 'item-burrata',
    _type: 'menuItem',
    name: 'Burrata & Prosciutto',
    description: 'Creamy burrata cheese with aged prosciutto, arugula, roasted figs, and a balsamic reduction.',
    price: '18',
    category: { _type: 'reference', _ref: 'category-appetizers' },
    dietaryTags: ['GF'],
    featured: false,
    available: true,
    order: 2,
  },
  {
    _id: 'item-tuna-tartare',
    _type: 'menuItem',
    name: 'Tuna Tartare',
    description: 'Sushi-grade ahi tuna with avocado mousse, crispy wontons, sesame, and ponzu dressing.',
    price: '19',
    category: { _type: 'reference', _ref: 'category-appetizers' },
    dietaryTags: ['GF', 'DF'],
    featured: false,
    available: true,
    order: 3,
  },
  {
    _id: 'item-soup-du-jour',
    _type: 'menuItem',
    name: 'Soup du Jour',
    description: 'Our chef\'s daily creation featuring seasonal produce. Ask your server for today\'s selection.',
    price: '12',
    category: { _type: 'reference', _ref: 'category-appetizers' },
    dietaryTags: ['V'],
    featured: false,
    available: true,
    order: 4,
  },

  // Mains
  {
    _id: 'item-grilled-salmon',
    _type: 'menuItem',
    name: 'Grilled Atlantic Salmon',
    description: 'Pan-seared salmon fillet with lemon-dill beurre blanc, roasted fingerling potatoes, and seasonal vegetables.',
    price: '34',
    category: { _type: 'reference', _ref: 'category-mains' },
    dietaryTags: ['GF'],
    featured: true,
    available: true,
    order: 1,
  },
  {
    _id: 'item-ribeye',
    _type: 'menuItem',
    name: '12oz Ribeye Steak',
    description: 'Dry-aged 28-day ribeye with truffle mashed potatoes, grilled asparagus, and red wine jus.',
    price: '48',
    category: { _type: 'reference', _ref: 'category-mains' },
    dietaryTags: ['GF'],
    featured: false,
    available: true,
    order: 2,
  },
  {
    _id: 'item-mushroom-risotto',
    _type: 'menuItem',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice slow-cooked with porcini, chanterelle, and shiitake mushrooms, finished with aged Parmigiano.',
    price: '26',
    category: { _type: 'reference', _ref: 'category-mains' },
    dietaryTags: ['V', 'GF'],
    featured: false,
    available: true,
    order: 3,
  },
  {
    _id: 'item-roasted-chicken',
    _type: 'menuItem',
    name: 'Roasted Half Chicken',
    description: 'Free-range chicken with herb butter, roasted root vegetables, and a natural pan jus.',
    price: '28',
    category: { _type: 'reference', _ref: 'category-mains' },
    dietaryTags: ['GF', 'DF'],
    featured: false,
    available: true,
    order: 4,
  },

  // Desserts
  {
    _id: 'item-tiramisu',
    _type: 'menuItem',
    name: 'Classic Tiramisu',
    description: 'Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with Valrhona cocoa.',
    price: '14',
    category: { _type: 'reference', _ref: 'category-desserts' },
    dietaryTags: ['V'],
    featured: true,
    available: true,
    order: 1,
  },
  {
    _id: 'item-creme-brulee',
    _type: 'menuItem',
    name: 'Vanilla Creme Brulee',
    description: 'Traditional French custard with Madagascar vanilla bean and a caramelized sugar crust.',
    price: '13',
    category: { _type: 'reference', _ref: 'category-desserts' },
    dietaryTags: ['V', 'GF'],
    featured: false,
    available: true,
    order: 2,
  },
  {
    _id: 'item-chocolate-fondant',
    _type: 'menuItem',
    name: 'Chocolate Fondant',
    description: 'Warm dark chocolate cake with a molten center, served with house-made vanilla ice cream.',
    price: '15',
    category: { _type: 'reference', _ref: 'category-desserts' },
    dietaryTags: ['V'],
    featured: false,
    available: true,
    order: 3,
  },
  {
    _id: 'item-panna-cotta',
    _type: 'menuItem',
    name: 'Panna Cotta',
    description: 'Silky Italian cream custard with a seasonal berry compote and fresh mint.',
    price: '12',
    category: { _type: 'reference', _ref: 'category-desserts' },
    dietaryTags: ['V', 'GF'],
    featured: false,
    available: true,
    order: 4,
  },

  // Cocktails
  {
    _id: 'item-old-fashioned',
    _type: 'menuItem',
    name: 'Old Fashioned',
    description: 'Woodford Reserve bourbon, Angostura bitters, demerara sugar, and a flamed orange peel.',
    price: '16',
    category: { _type: 'reference', _ref: 'category-cocktails' },
    dietaryTags: ['VG', 'GF'],
    featured: true,
    available: true,
    order: 1,
  },
  {
    _id: 'item-espresso-martini',
    _type: 'menuItem',
    name: 'Espresso Martini',
    description: 'Freshly pulled espresso shaken with vodka, Kahlua, and a hint of vanilla.',
    price: '17',
    category: { _type: 'reference', _ref: 'category-cocktails' },
    dietaryTags: ['VG', 'GF'],
    featured: false,
    available: true,
    order: 2,
  },
  {
    _id: 'item-aperol-spritz',
    _type: 'menuItem',
    name: 'Aperol Spritz',
    description: 'Aperol, prosecco, and soda water over ice with a fresh orange slice. Light and refreshing.',
    price: '14',
    category: { _type: 'reference', _ref: 'category-cocktails' },
    dietaryTags: ['VG', 'GF'],
    featured: false,
    available: true,
    order: 3,
  },
  {
    _id: 'item-negroni',
    _type: 'menuItem',
    name: 'Negroni',
    description: 'Equal parts gin, Campari, and sweet vermouth, stirred and served over a large ice cube.',
    price: '16',
    category: { _type: 'reference', _ref: 'category-cocktails' },
    dietaryTags: ['VG', 'GF'],
    featured: false,
    available: true,
    order: 4,
  },
]

// --- Team Members ---
const teamMembers = [
  {
    _id: 'team-head-chef',
    _type: 'teamMember',
    name: 'Marco Valentini',
    role: 'Head Chef',
    bio: textBlocks(
      [
        'With over 15 years of experience in Michelin-starred kitchens across Italy and New York, Chef Marco brings a deep respect for tradition and a passion for innovation to every plate.',
        'His cooking philosophy centers on letting exceptional ingredients speak for themselves, transforming seasonal produce into dishes that are both comforting and extraordinary.',
      ],
      'chef-bio',
    ),
    order: 1,
  },
  {
    _id: 'team-general-manager',
    _type: 'teamMember',
    name: 'Sarah Mitchell',
    role: 'General Manager',
    bio: textBlocks(
      [
        'Sarah has spent over a decade in hospitality, honing her craft at some of the city\'s most acclaimed restaurants. Her warm, attentive approach ensures every guest feels at home.',
        'She leads our front-of-house team with an emphasis on genuine care and effortless service, creating memorable experiences night after night.',
      ],
      'gm-bio',
    ),
    order: 2,
  },
]

// --- Testimonials ---
const testimonials = [
  {
    _id: 'testimonial-1',
    _type: 'testimonial',
    author: 'James R.',
    quote: 'An absolutely unforgettable dining experience. The grilled salmon was cooked to perfection and the service was impeccable. We\'ll definitely be back.',
    rating: 5,
    source: 'Google',
    date: '2025-11-15',
  },
  {
    _id: 'testimonial-2',
    _type: 'testimonial',
    author: 'Emily S.',
    quote: 'The ambiance is stunning and the cocktails are some of the best in the city. The Old Fashioned alone is worth the visit. Highly recommend for a date night.',
    rating: 5,
    source: 'Yelp',
    date: '2025-10-22',
  },
  {
    _id: 'testimonial-3',
    _type: 'testimonial',
    author: 'David & Lisa M.',
    quote: 'We hosted our anniversary dinner here and every detail was perfect. The staff went above and beyond to make it special. The tiramisu is a must-order!',
    rating: 4,
    source: 'TripAdvisor',
    date: '2025-12-03',
  },
]

// --- FAQ Items ---
const faqItems = [
  {
    _id: 'faq-reservations',
    _type: 'faqItem',
    question: 'Do I need a reservation?',
    answer: textBlocks(
      [
        'While walk-ins are always welcome, we highly recommend making a reservation, especially for Friday and Saturday evenings. You can book online through our reservation system or call us directly at 555-123-4567.',
        'For parties of 6 or more, please contact us at least 48 hours in advance so we can ensure the best possible experience for your group.',
      ],
      'faq-reservations',
    ),
    category: 'Reservations',
    order: 1,
  },
  {
    _id: 'faq-parking',
    _type: 'faqItem',
    question: 'Is there parking available?',
    answer: textBlocks(
      [
        'We offer complimentary valet parking on Friday and Saturday evenings from 5:00 PM to close. On other days, street parking is available along Main Street and the surrounding blocks.',
        'There is also a public parking garage located one block east on 2nd Avenue, which offers evening flat rates.',
      ],
      'faq-parking',
    ),
    category: 'General',
    order: 2,
  },
  {
    _id: 'faq-dietary',
    _type: 'faqItem',
    question: 'Can you accommodate dietary restrictions and allergies?',
    answer: textBlocks(
      [
        'Absolutely. Our menu includes vegetarian, vegan, and gluten-free options, all clearly marked with dietary tags. Our kitchen team is experienced in preparing meals for a wide range of dietary needs.',
        'Please inform your server of any allergies or restrictions when ordering, and we will do our best to accommodate you. For severe allergies, we recommend calling ahead so our chef can prepare accordingly.',
      ],
      'faq-dietary',
    ),
    category: 'Dietary',
    order: 3,
  },
  {
    _id: 'faq-private-events',
    _type: 'faqItem',
    question: 'Do you host private events?',
    answer: textBlocks(
      [
        'Yes! We have a private dining room that seats up to 30 guests, perfect for birthday celebrations, corporate dinners, rehearsal dinners, and other special occasions.',
        'Our events team can create a custom menu tailored to your preferences and budget. Please email us at hello@therestaurant.com or call to discuss your event.',
      ],
      'faq-events',
    ),
    category: 'Events',
    order: 4,
  },
  {
    _id: 'faq-dress-code',
    _type: 'faqItem',
    question: 'Is there a dress code?',
    answer: textBlocks(
      [
        'We maintain a smart-casual dress code. We want you to feel comfortable while also respecting the dining atmosphere. Collared shirts, blouses, dresses, and clean denim are all perfectly appropriate.',
        'We kindly ask that guests refrain from wearing athletic wear, flip-flops, or tank tops in the dining room.',
      ],
      'faq-dress',
    ),
    category: 'General',
    order: 5,
  },
]

// --- Pages ---

const aboutPageBody = [
  headingBlock('Our Story', 'about-h1', 'h2'),
  ...textBlocks(
    [
      'The Restaurant was founded in 2010 with a simple mission: to create a space where exceptional food, warm hospitality, and genuine community come together.',
      'What began as a small neighborhood bistro has grown into one of the city\'s most beloved dining destinations, but our core values have never changed. We believe great food starts with great ingredients, and we work closely with local farmers, fishermen, and artisan producers to bring the very best to your plate.',
    ],
    'about-story',
  ),
  headingBlock('Our Philosophy', 'about-h2', 'h2'),
  ...textBlocks(
    [
      'Every dish on our menu reflects a deep respect for tradition and a willingness to explore. Our chef draws inspiration from Italian, French, and American culinary traditions, combining time-honored techniques with modern creativity.',
      'We are passionate about sustainability and source our produce seasonally, minimizing waste and supporting the local economy. Our menu changes regularly to reflect what is freshest and most flavorful.',
    ],
    'about-philosophy',
  ),
  headingBlock('The Space', 'about-h3', 'h2'),
  ...textBlocks(
    [
      'Our dining room features exposed brick, warm lighting, and an open kitchen where you can watch our team at work. Whether you are joining us for an intimate dinner for two or celebrating with a larger group in our private dining room, we have created a space that feels both special and welcoming.',
      'We look forward to welcoming you soon.',
    ],
    'about-space',
  ),
]

const privacyPageBody = [
  headingBlock('Privacy Policy', 'priv-h1', 'h2'),
  ...textBlocks(
    [
      'Last updated: January 1, 2026. This Privacy Policy describes how The Restaurant ("we", "us", or "our") collects, uses, and shares information when you visit our website or dine with us.',
    ],
    'priv-intro',
  ),
  headingBlock('Information We Collect', 'priv-h2', 'h2'),
  ...textBlocks(
    [
      'We may collect personal information that you voluntarily provide to us, including your name, email address, phone number, and any other information you provide when making a reservation, signing up for our newsletter, or contacting us through our website.',
      'We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our site. This data is collected through cookies and similar tracking technologies.',
    ],
    'priv-collect',
  ),
  headingBlock('How We Use Your Information', 'priv-h3', 'h2'),
  ...textBlocks(
    [
      'We use the information we collect to process reservations, respond to inquiries, send promotional communications (with your consent), improve our website and services, and comply with legal obligations.',
      'We will never sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, or delivering communications on our behalf.',
    ],
    'priv-use',
  ),
  headingBlock('Cookies', 'priv-h4', 'h2'),
  ...textBlocks(
    [
      'Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site.',
      'You can control cookie settings through your browser preferences. Please note that disabling cookies may affect the functionality of certain parts of our website.',
    ],
    'priv-cookies',
  ),
  headingBlock('Third-Party Services', 'priv-h5', 'h2'),
  ...textBlocks(
    [
      'Our website may contain links to third-party websites, such as our reservation platform, social media profiles, and payment processors. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.',
      'We use analytics services to understand website usage patterns. These services may collect information about your visits using cookies and similar technologies.',
    ],
    'priv-third',
  ),
  headingBlock('Data Security', 'priv-h6', 'h2'),
  ...textBlocks(
    [
      'We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.',
    ],
    'priv-security',
  ),
  headingBlock('Your Rights', 'priv-h7', 'h2'),
  ...textBlocks(
    [
      'You have the right to access, correct, or delete your personal information. You may also opt out of receiving marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.',
    ],
    'priv-rights',
  ),
  headingBlock('Contact Us', 'priv-h8', 'h2'),
  ...textBlocks(
    [
      'If you have any questions about this Privacy Policy or our data practices, please contact us at hello@therestaurant.com or write to us at 123 Main Street, New York, NY 10001.',
    ],
    'priv-contact',
  ),
]

const pages = [
  {
    _id: 'page-about',
    _type: 'page',
    title: 'Our Story',
    slug: { _type: 'slug', current: 'about' },
    body: aboutPageBody,
  },
  {
    _id: 'page-privacy',
    _type: 'page',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy' },
    body: privacyPageBody,
  },
]

// ---------------------------------------------------------------------------
// Seed runner
// ---------------------------------------------------------------------------

type SanityDocument = { _id: string; _type: string; [key: string]: unknown }

async function seedDocuments(label: string, documents: SanityDocument[]) {
  console.log(`\nSeeding ${label}...`)
  for (const doc of documents) {
    try {
      await client.createOrReplace(doc)
      console.log(`  + ${doc._type} "${doc._id}"`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`  ! Failed to create ${doc._id}: ${message}`)
    }
  }
  console.log(`  Done. (${documents.length} ${label.toLowerCase()})`)
}

async function main() {
  console.log('===========================================')
  console.log('  Sanity Seed Script')
  console.log(`  Project: ${projectId}`)
  console.log(`  Dataset: ${dataset}`)
  console.log('===========================================')

  await seedDocuments('Site Settings', [siteSettings])
  await seedDocuments('Menu Categories', menuCategories)
  await seedDocuments('Menu Items', menuItems)
  await seedDocuments('Home Page', [homePage])
  await seedDocuments('Team Members', teamMembers)
  await seedDocuments('Testimonials', testimonials)
  await seedDocuments('FAQ Items', faqItems)
  await seedDocuments('Pages', pages)

  console.log('\n===========================================')
  console.log('  Seeding complete!')
  console.log('  Open Sanity Studio to verify your content.')
  console.log('===========================================\n')
}

main().catch((err) => {
  console.error('Fatal error during seeding:', err)
  process.exit(1)
})
