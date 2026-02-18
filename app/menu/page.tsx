import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY, MENU_QUERY } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MenuContent from './MenuContent'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our menu featuring fresh, seasonal dishes and handcrafted beverages.',
}

export default async function MenuPage() {
  const [{ data: settings }, { data: menu }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: MENU_QUERY }),
  ])

  return (
    <>
      <Header siteSettings={settings} />
      <main className="py-16 sm:py-24">
        <MenuContent categories={menu?.categories || []} />
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
