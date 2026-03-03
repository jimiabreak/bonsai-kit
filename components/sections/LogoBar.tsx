import Container from '@/components/layout/Container'
import SanityImage from '@/components/sanity/SanityImage'

interface LogoBarProps {
  heading?: string
  logos?: Array<{ _key: string; asset: any; alt?: string }>
}

export default function LogoBar({ heading, logos }: LogoBarProps) {
  if (!logos || logos.length === 0) return null
  return (
    <section className="py-12 sm:py-16 bg-muted">
      <Container>
        {heading && <h2 className="text-sm uppercase tracking-wider text-center text-muted-foreground mb-8">{heading}</h2>}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {logos.map((logo) => (
            <div key={logo._key} className="h-10 sm:h-12 opacity-60 hover:opacity-100 transition-opacity">
              <SanityImage image={logo} alt={logo.alt || ''} height={48} width={120} className="h-full w-auto object-contain" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
