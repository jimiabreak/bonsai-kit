# Contact Form reCAPTCHA v3 Implementation

**Date:** 2026-01-24
**Status:** Ready for implementation

## Goal

Add invisible reCAPTCHA v3 to the contact form to prevent spam submissions.

## How It Works

1. **Load reCAPTCHA script** - Google's script loads on the contact page
2. **Execute on submit** - When user submits, request a token (invisible to user)
3. **Send token to API** - Include token with form data
4. **Verify server-side** - API calls Google to verify and get a score (0.0 = bot, 1.0 = human)
5. **Accept or reject** - Score >= 0.5 proceeds, below rejects

## Files to Modify

### 1. `.env.local` - Add keys

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lf_AVUsAAAAAJEDu7tUj3NL-A4yT7SqqeCODBJ7
RECAPTCHA_SECRET_KEY=6Lf_AVUsAAAAAAsWBXh9n837u-oY3lfX6qwOO9yv
```

### 2. `app/contact/page.tsx` - Client-side integration

- Import `Script` from `next/script`
- Load reCAPTCHA script with site key
- Declare `grecaptcha` on window for TypeScript
- Modify `handleSubmit` to:
  - Call `grecaptcha.execute()` to get token
  - Include token in fetch body

Remove the placeholder div (lines 165-170).

### 3. `app/api/contact/route.ts` - Server-side verification

- Extract `recaptchaToken` from request body
- Verify with Google:
  ```
  POST https://www.google.com/recaptcha/api/siteverify
  Body: secret={SECRET}&response={TOKEN}
  ```
- Check response: `success === true && score >= 0.5`
- Return 400 if verification fails
- Proceed with email if passes

## Error Handling

- If reCAPTCHA script fails to load: form still submits, API rejects (safe default)
- If Google verification fails: return user-friendly error
- If score too low: return "Unable to verify you're human" message

## Score Threshold

Starting at 0.5 (Google's recommendation). Can adjust:
- Raise to 0.7 if still getting spam
- Lower to 0.3 if blocking real users

## Privacy Badge

reCAPTCHA v3 requires either:
- Visible badge (default, appears bottom-right)
- Hidden badge with text attribution

Recommendation: Keep visible badge for simplicity. Can hide later if needed.

## Testing

1. Submit form normally - should succeed
2. Check email arrives via Resend
3. Check server logs for reCAPTCHA score
