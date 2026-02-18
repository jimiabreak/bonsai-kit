import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY, PAGE_QUERY } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/layout/Container'

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
      <main className="py-16 sm:py-24">
        <Container>
          <h1 className="font-serif text-4xl sm:text-5xl text-center mb-12">
            {page?.title || 'Privacy Policy'}
          </h1>
          {page?.body ? (
            <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
              <PortableText value={page.body} />
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Privacy policy content will appear here once added in the CMS.
            </p>
          )}
        </Container>
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
