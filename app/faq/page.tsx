import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY, FAQ_QUERY } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/layout/Container'
import FAQContent from './FAQContent'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about our business, services, and policies.',
}

export default async function FAQPage() {
  const [{ data: settings }, { data: faqs }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: FAQ_QUERY }),
  ])

  return (
    <>
      <Header siteSettings={settings} />
      <main id="main" className="py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-4xl sm:text-5xl text-center mb-12">
            Frequently Asked Questions
          </h1>
          <FAQContent faqs={faqs || []} />
        </Container>
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
