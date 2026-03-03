import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const resend = new Resend(process.env.RESEND_API_KEY)

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const emailPromise = resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'noreply@example.com',
      to: process.env.CONTACT_EMAIL_TO || 'hello@example.com',
      subject: `Contact form: ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    })

    const sanityPromise = writeClient.create({
      _type: 'submission',
      name,
      email,
      phone: phone || undefined,
      message,
      page: '/contact',
      source: 'contact',
      submittedAt: new Date().toISOString(),
    }).catch((err) => {
      console.error('Failed to write submission to Sanity:', err)
    })

    await Promise.all([emailPromise, sanityPromise])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
