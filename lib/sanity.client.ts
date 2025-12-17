import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'wvwhqsyr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false for development to get fresh data
  perspective: 'published', // Only fetch published content
})

// Client for draft/preview mode (not CDN cached)
export const previewClient = createClient({
  projectId: 'wvwhqsyr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN, // Optional: for authenticated requests
})

// Helper to get the right client based on preview mode
export function getClient(preview: boolean = false) {
  return preview ? previewClient : client
}
