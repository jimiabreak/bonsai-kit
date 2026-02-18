'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import MobileNav from './MobileNav'
import SanityImage from '@/components/sanity/SanityImage'

interface HeaderProps {
  siteSettings?: {
    name?: string
    logo?: any
    reservationUrl?: string
  }
}

const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header({ siteSettings }: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <motion.header
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Name */}
          <Link href="/" className="flex items-center gap-3">
            {siteSettings?.logo ? (
              <SanityImage
                image={siteSettings.logo}
                alt={siteSettings.name || 'Restaurant'}
                width={40}
                height={40}
                className="h-8 w-auto sm:h-10"
              />
            ) : (
              <span className="font-serif text-xl sm:text-2xl font-bold">
                {siteSettings?.name || 'Restaurant'}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wider hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {siteSettings?.reservationUrl && (
              <a
                href={siteSettings.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 text-sm uppercase tracking-wider hover:bg-primary-light transition-colors"
              >
                Reserve
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden touch-target flex items-center justify-center"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={[
          ...navLinks,
          ...(siteSettings?.reservationUrl
            ? [{ href: siteSettings.reservationUrl, label: 'Reserve a Table' }]
            : []),
        ]}
      />
    </motion.header>
  )
}
