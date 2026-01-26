import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key exists (prevents build errors)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

interface RecaptchaResult {
  success: boolean;
  score?: number;
  action?: string;
  errorCodes?: string[];
}

async function verifyRecaptcha(token: string): Promise<RecaptchaResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('[reCAPTCHA] RECAPTCHA_SECRET_KEY is not configured');
    return { success: false, errorCodes: ['missing-secret-key'] };
  }

  if (!token) {
    console.error('[reCAPTCHA] No token provided');
    return { success: false, errorCodes: ['missing-token'] };
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secretKey.trim());
    params.append('response', token.trim());

    console.log('[reCAPTCHA] Verifying token with Google...');

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data: RecaptchaResponse = await response.json();

    // Log full response for debugging
    console.log('[reCAPTCHA] Google response:', JSON.stringify({
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    }));

    if (!data.success) {
      console.error('[reCAPTCHA] Verification failed:', data['error-codes']);
      return { success: false, errorCodes: data['error-codes'] };
    }

    // Check score threshold (0.5 is Google's recommended default)
    const score = data.score ?? 1.0; // Default to 1.0 if no score (checkbox reCAPTCHA)
    const passesScore = score >= 0.5;

    if (!passesScore) {
      console.warn(`[reCAPTCHA] Score too low: ${score} (threshold: 0.5)`);
    }

    // Check action matches expected value
    if (data.action && data.action !== 'contact_form') {
      console.warn(`[reCAPTCHA] Action mismatch: expected 'contact_form', got '${data.action}'`);
    }

    return {
      success: data.success && passesScore,
      score: data.score,
      action: data.action,
    };
  } catch (error) {
    console.error('[reCAPTCHA] Verification error:', error);
    return { success: false, errorCodes: ['network-error'] };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const { name, email, message, recaptchaToken } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    console.log('[Contact] Received submission from:', email);

    if (!recaptchaToken) {
      console.error('[Contact] No reCAPTCHA token provided');
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      console.error('[Contact] reCAPTCHA failed:', recaptchaResult.errorCodes);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }
    console.log(`[Contact] reCAPTCHA passed with score: ${recaptchaResult.score}`);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Commonwealth Coffee <noreply@gocommonwealth.com>',
      to: ['info@gocommonwealth.com'],
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
