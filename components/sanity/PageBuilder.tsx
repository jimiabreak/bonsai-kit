import Hero from '@/components/sections/Hero'
import SplitContent from '@/components/sections/SplitContent'
import RichText from '@/components/sections/RichText'
import CTA from '@/components/sections/CTA'
import FeaturedMenu from '@/components/sections/FeaturedMenu'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Team from '@/components/sections/Team'
import ImageGallery from '@/components/sections/ImageGallery'
import ContactForm from '@/components/sections/ContactForm'
import Embed from '@/components/sections/Embed'
import MenuSection from '@/components/sections/MenuSection'
import LogoBar from '@/components/sections/LogoBar'
import StatsBar from '@/components/sections/StatsBar'

const sectionComponents: Record<string, React.ComponentType<any>> = {
  sectionHero: Hero,
  sectionSplitContent: SplitContent,
  sectionRichText: RichText,
  sectionCta: CTA,
  sectionFeaturedMenu: FeaturedMenu,
  sectionTestimonials: Testimonials,
  sectionFaq: FAQ,
  sectionTeam: Team,
  sectionImageGallery: ImageGallery,
  sectionContactForm: ContactForm,
  sectionEmbed: Embed,
  sectionMenuSection: MenuSection,
  sectionLogoBar: LogoBar,
  sectionStatsBar: StatsBar,
}

interface PageBuilderProps {
  sections?: Array<{ _type: string; _key: string; [key: string]: any }>
}

export default function PageBuilder({ sections }: PageBuilderProps) {
  if (!sections || sections.length === 0) return null
  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section._type]
        if (!Component) {
          console.warn(`Unknown section type: ${section._type}`)
          return null
        }
        return <Component key={section._key} {...section} />
      })}
    </>
  )
}
