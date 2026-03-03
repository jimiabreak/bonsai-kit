import { PortableText } from '@portabletext/react'
import Container from '@/components/layout/Container'

interface RichTextProps {
  body?: any
}

export default function RichText({ body }: RichTextProps) {
  if (!body) return null
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
          <PortableText value={body} />
        </div>
      </Container>
    </section>
  )
}
