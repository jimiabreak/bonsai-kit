import Image from 'next/image'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageProps {
  image: SanityImageSource
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export default function SanityImage({
  image,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
  priority = false,
}: SanityImageProps) {
  if (!image?.asset) return null

  const imageUrl = urlFor(image)
    .auto('format')
    .quality(80)
    .url()

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes || '100vw'}
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  )
}
