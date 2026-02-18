import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY, ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/layout/Container'
import TeamCard from '@/components/ui/TeamCard'
import GalleryGrid from '@/components/ui/GalleryGrid'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about our story, meet the team, and see our space.',
}

export default async function AboutPage() {
  const [{ data: settings }, { data }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: ABOUT_PAGE_QUERY }),
  ])

  const { page, team, gallery } = data || {}

  return (
    <>
      <Header siteSettings={settings} />
      <main className="py-16 sm:py-24">
        {/* Story */}
        <Container>
          <h1 className="font-serif text-4xl sm:text-5xl text-center mb-12">
            {page?.title || 'About Us'}
          </h1>
          {page?.body && (
            <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
              <PortableText value={page.body} />
            </div>
          )}
        </Container>

        {/* Team */}
        {team && team.length > 0 && (
          <section className="py-20 sm:py-28 bg-muted">
            <Container>
              <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12">
                Meet the Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member: any) => (
                  <TeamCard
                    key={member._id}
                    name={member.name}
                    role={member.role}
                    image={member.image}
                  />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <section className="py-20 sm:py-28">
            <Container>
              <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12">
                Our Space
              </h2>
              <GalleryGrid images={gallery} />
            </Container>
          </section>
        )}
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
