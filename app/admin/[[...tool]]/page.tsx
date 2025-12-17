'use client'

/**
 * Embedded Sanity Studio
 *
 * This route serves the Sanity Studio at /admin
 * Access at: http://localhost:3000/admin
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function AdminPage() {
  return <NextStudio config={config} />
}
