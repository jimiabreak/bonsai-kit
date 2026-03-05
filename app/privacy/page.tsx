import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY, PAGE_QUERY } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/layout/Container'
import PageBuilder from '@/components/sanity/PageBuilder'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and how we handle your data.',
}

export default async function PrivacyPage() {
  const [{ data: settings }, { data: page }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: PAGE_QUERY, params: { slug: 'privacy' } }),
  ])

  return (
    <>
      <Header siteSettings={settings} />
      <main id="main" className="py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-4xl sm:text-5xl text-center mb-12">
            {page?.title || 'Privacy Policy'}
          </h1>
          <PageBuilder sections={page?.pageBuilder} />
        </Container>
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
