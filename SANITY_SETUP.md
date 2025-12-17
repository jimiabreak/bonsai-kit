# Sanity Studio Setup

## Initial Setup

1. **Create a Sanity account and project:**
   ```bash
   npm install -g @sanity/cli
   sanity login
   sanity init
   ```

2. **Get your Project ID and Dataset:**
   - Go to https://sanity.io/manage
   - Find your project
   - Copy the Project ID
   - Note your dataset name (usually "production")

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

4. **Add environment variables to Vercel:**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add all three variables from above
   - Redeploy

5. **Configure CORS for your domains:**
   - Go to https://sanity.io/manage
   - Select your project
   - Go to API settings
   - Add these origins:
     - `http://localhost:3000`
     - `https://commonwealth-website.vercel.app`
     - `https://www.gocommonwealth.com`

## Accessing the Studio

- **Local:** http://localhost:3000/admin
- **Vercel:** https://commonwealth-website.vercel.app/admin
- **Production:** https://www.gocommonwealth.com/admin

## Creating an API Token

1. Go to https://sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions
5. Copy the token and add it to your environment variables
