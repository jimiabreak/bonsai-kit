import { defineLive } from 'next-sanity'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    token,
    stega: {
      studioUrl: '/studio',
    },
  }),
  serverToken: token,
  browserToken: token,
})
