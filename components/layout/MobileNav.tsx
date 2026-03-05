'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { NavLink } from '@/types'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

export default function MobileNav({ isOpen, onClose, links, triggerRef }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => closeButtonRef.current?.focus())
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
      triggerRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown, triggerRef])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-charcoal-900/50 z-40 md:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed top-[72px] right-0 bottom-0 w-64 bg-cream shadow-xl z-50 md:hidden animate-slide-in overscroll-contain"
      >
        <div className="flex flex-col py-6 px-4 space-y-4">
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close menu"
            className="self-end touch-target flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-sans text-charcoal-900 hover:text-coffee-700 transition-colors py-2 touch-target"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
