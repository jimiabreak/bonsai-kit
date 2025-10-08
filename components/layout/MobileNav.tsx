'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { NavLink } from '@/types';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-charcoal-900/50 z-40 md:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <nav
        className="fixed top-[72px] right-0 bottom-0 w-64 bg-cream shadow-xl z-50 md:hidden animate-slide-in"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col py-6 px-4 space-y-4">
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
    </>
  );
}
