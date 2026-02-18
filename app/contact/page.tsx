import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with us. Find our hours, location, and send us a message.',
}

export default async function ContactPage() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY })

  return (
    <>
      <Header siteSettings={settings} />
      <main className="py-16 sm:py-24">
        <ContactContent settings={settings} />
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
