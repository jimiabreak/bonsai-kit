import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY, HOME_PAGE_QUERY } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageBuilder from '@/components/sanity/PageBuilder'

export default async function HomePage() {
  const [{ data: settings }, { data: page }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: HOME_PAGE_QUERY }),
  ])

  return (
    <>
      <Header siteSettings={settings} />
      <main id="main">
        <PageBuilder sections={page?.pageBuilder} />
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
