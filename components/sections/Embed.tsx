import { stegaClean } from '@sanity/client/stega'
import Container from '@/components/layout/Container'

interface EmbedProps {
  heading?: string
  embedType?: 'video' | 'map' | 'custom'
  embedUrl?: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16'
}

const aspectClasses: Record<string, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
}

export default function Embed({ heading, embedUrl, aspectRatio = '16:9' }: EmbedProps) {
  const cleanUrl = stegaClean(embedUrl)
  if (!cleanUrl) return null
  return (
    <section className="py-16 sm:py-24">
      <Container>
        {heading && <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12">{heading}</h2>}
        <div className={`relative ${aspectClasses[stegaClean(aspectRatio)] || 'aspect-video'} overflow-hidden rounded-sm`}>
          <iframe src={cleanUrl} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </Container>
    </section>
  )
}
