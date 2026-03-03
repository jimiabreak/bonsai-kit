'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

interface ContactFormProps {
  heading?: string
  subheading?: string
}

export default function ContactForm({ heading, subheading }: ContactFormProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      message: formData.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || 'Failed to send')
      }
      setFormState('success')
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong')
      setFormState('error')
    }
  }

  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="py-20 sm:py-28 bg-muted">
      <Container>
        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4">{heading || 'Get in Touch'}</h2>
          {subheading && <p className="text-center text-muted-foreground text-lg mb-12">{subheading}</p>}
          {formState === 'success' ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-primary">Thank you! We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-border bg-background rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-border bg-background rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-border bg-background rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 border border-border bg-background rounded-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              {formState === 'error' && <p className="text-red-600 text-sm">{errorMessage}</p>}
              <Button type="submit" variant="primary" disabled={formState === 'submitting'}>
                {formState === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </motion.div>
      </Container>
    </motion.section>
  )
}
