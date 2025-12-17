import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const imageBuilder = createImageUrlBuilder({
  projectId: 'wvwhqsyr',
  dataset: 'production',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

// Helper to get optimized image URLs
export function getImageUrl(
  source: Image,
  width?: number,
  height?: number
): string {
  if (!source) return ''

  let builder = urlForImage(source)

  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)

  return builder.url()
}
