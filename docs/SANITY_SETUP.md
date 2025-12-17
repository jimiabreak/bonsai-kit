# Sanity CMS Setup Guide

## ✅ Current Status

### What's Configured
- ✅ Sanity dependencies installed
- ✅ Project ID: `wvwhqsyr`
- ✅ Organization: `ocdbAMMWE`
- ✅ Dataset: `production`
- ✅ Studio directory created (`/studio`)
- ✅ Schema types created (5 types)
- ✅ Next.js client configured
- ✅ GROQ queries written
- ✅ Migration script ready

### Schema Types Created

1. **menuTab** - Top-level menu navigation (Food, Drinks, Features)
2. **menuCategory** - Categories within tabs (Savory, Sweet, Bowls, etc.)
3. **menuItem** - Individual menu items with pricing and descriptions
4. **faqItem** - FAQ questions and answers
5. **contactInfo** - Contact information and business hours

---

## 🚧 Known Issue: Node.js Compatibility

The Sanity Studio CLI (v3) has compatibility issues with Node.js v22.9.0.

**Error**:
```
[WARN] The current Node.js version (v22.9.0) is not supported
Please upgrade to a version that satisfies the range >=20.19 <22 || >=22.12
```

### Solutions

#### Option A: Use Sanity's Hosted Studio (Recommended)
Access your studio at: **https://wvwhqsyr.sanity.studio**

**Pros**:
- No local setup needed
- Always up to date
- Accessible from anywhere
- No Node version issues

**Cons**:
- Requires internet connection
- Slightly slower than local

#### Option B: Upgrade Node.js
```bash
# Using nvm (if installed)
nvm install 22.12.0
nvm use 22.12.0

# Then run studio
cd studio && npm run dev
```

#### Option C: Embed Studio in Next.js App
Add studio route at `/app/admin/[[...tool]]/page.tsx` (see Sanity docs)

---

## 📊 Migration Process

### Step 1: Get Sanity API Token

1. Go to https://www.sanity.io/manage/personal/tokens
2. Click "Create new token"
3. Name: "Migration Script"
4. Permissions: **Editor**
5. Copy the token

### Step 2: Add Token to Environment

Edit `.env.local` and add:
```env
SANITY_API_TOKEN=your_token_here
```

### Step 3: Run Migration

```bash
npx tsx scripts/migrate-to-sanity.ts
```

This will:
- ✅ Read your `content/menu.json`
- ✅ Create 3 menu tabs (Food, Drinks, Features)
- ✅ Create all categories (Savory, Sweet, Bowls, etc.)
- ✅ Create 100+ menu items
- ✅ Extract dietary info from item names
- ✅ Preserve pricing and descriptions

**Expected Output**:
```
🚀 Starting migration from JSON to Sanity...
📖 Loaded menu data from content/menu.json
   Last updated: 2025-01-10

📊 Found 3 tabs to migrate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📑 Processing tab: FOOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Created tab: Food
   📁 Created category: Savory
      ✓ SHAKSHUKA - $20
      ✓ BENEDICT - $20
      ...

✨ Migration Complete!
📊 Summary:
   Tabs created: 3
   Categories created: 12
   Items created: 100+
```

---

## 🎨 Using the Studio

### Access Your Studio

**Option 1: Hosted Studio**
- URL: https://wvwhqsyr.sanity.studio
- Login with your Sanity account
- Start editing immediately

**Option 2: Local Studio** (after Node version fix)
```bash
cd studio
npm run dev
```
Then visit: http://localhost:3333

### Editing Menu Items

1. **Add New Item**:
   - Click "Menu Item" in sidebar
   - Click "Create new"
   - Fill in name, price, description
   - Select category
   - Add dietary tags
   - Publish

2. **Update Prices**:
   - Find item in list
   - Click to edit
   - Change price field
   - Publish

3. **Reorder Items**:
   - Edit "Sort Order" field
   - Lower numbers appear first
   - Publish

4. **Mark as New**:
   - Check "New Item" checkbox
   - Publish

### Creating Categories

1. Click "Menu Category"
2. Enter category name
3. Select parent tab (Food/Drinks/Features)
4. Set sort order
5. Publish

---

## 🔌 Next.js Integration

### Client Setup

Already configured in `/lib/sanity.client.ts`:

```typescript
import { client } from '@/lib/sanity.client'
import { MENU_QUERY } from '@/lib/sanity.queries'

// In any server component
const menuData = await client.fetch(MENU_QUERY)
```

### Available Queries

Located in `/lib/sanity.queries.ts`:

- `MENU_QUERY` - Get all tabs, categories, and items
- `MENU_TAB_QUERY` - Get single tab by ID
- `FAQ_QUERY` - Get all FAQ items
- `CONTACT_QUERY` - Get contact info
- `NEW_MENU_ITEMS_QUERY` - Get items marked as "new"
- `SEARCH_MENU_ITEMS_QUERY` - Search by name

### Example: Update Menu Page

```typescript
// app/menu/page.tsx
import { client } from '@/lib/sanity.client'
import { MENU_QUERY } from '@/lib/sanity.queries'

export default async function MenuPage() {
  // Fetch from Sanity instead of static JSON
  const menuData = await client.fetch(MENU_QUERY)

  return (
    <div>
      {menuData.map(tab => (
        <div key={tab._id}>
          <h2>{tab.label}</h2>
          {tab.categories.map(category => (
            <div key={category._id}>
              <h3>{category.name}</h3>
              {category.items.map(item => (
                <div key={item._id}>
                  <h4>{item.name} - ${item.price}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
```

### Incremental Static Regeneration (ISR)

Enable fresh content without rebuilding:

```typescript
// app/menu/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

export default async function MenuPage() {
  const menuData = await client.fetch(MENU_QUERY)
  // ...
}
```

---

## 🚀 Deployment

### Deploy Studio to Sanity Cloud

```bash
cd studio
npx sanity deploy
```

Choose a hostname: `commonwealth-admin` or similar

Your studio will be at: `https://commonwealth-admin.sanity.studio`

### Configure CORS

1. Go to https://www.sanity.io/manage/project/wvwhqsyr/api
2. Add your domains:
   - `http://localhost:3000` (development)
   - `https://your-production-domain.com` (production)
   - `https://your-vercel-preview.vercel.app` (Vercel previews)

---

## 📋 Content Migration Checklist

- [ ] Get Sanity API token
- [ ] Add token to `.env.local`
- [ ] Run migration script
- [ ] Verify data in Sanity Studio
- [ ] Test queries in Vision plugin
- [ ] Update Next.js pages to use Sanity
- [ ] Test locally
- [ ] Deploy studio
- [ ] Configure CORS
- [ ] Deploy Next.js app
- [ ] Train team on using studio

---

## 🎓 Training Guide

### For Content Editors

**Updating Menu Items**:
1. Go to your studio URL
2. Click "Menu Item" in sidebar
3. Find item you want to edit
4. Make changes
5. Click "Publish"
6. Changes appear on website within 60 seconds

**Adding New Items**:
1. Click "Menu Item" > "Create new"
2. Enter name (e.g., "AVOCADO TOAST")
3. Enter price (just number, e.g., "15")
4. Write description
5. Select category from dropdown
6. Add dietary tags if applicable
7. Check "New Item" to highlight it
8. Click "Publish"

**Quarterly Menu Updates**:
1. Update prices as needed
2. Mark seasonal items as "New"
3. Hide old items (unpublish)
4. Add new seasonal items
5. Reorder if needed (sort order)
6. Publish all changes at once

---

## 🆘 Troubleshooting

### Studio won't start locally
**Issue**: Node version incompatibility
**Solution**: Use hosted studio at https://wvwhqsyr.sanity.studio

### Migration fails
**Issue**: Missing API token
**Solution**:
1. Get token from https://www.sanity.io/manage/personal/tokens
2. Add to `.env.local`
3. Ensure it has "Editor" permissions

### Data not showing in Next.js
**Issue**: CORS not configured
**Solution**: Add your domain in Sanity project settings > API

### Changes not appearing on site
**Issue**: CDN cache or ISR timing
**Solution**:
- Wait 60 seconds (ISR revalidate time)
- Or force rebuild in Vercel
- Or set `useCdn: false` in client config

---

## 📚 Resources

### Sanity Documentation
- **Sanity Studio**: https://www.sanity.io/docs/sanity-studio
- **GROQ Queries**: https://www.sanity.io/docs/groq
- **Next.js Integration**: https://www.sanity.io/docs/nextjs

### Project Links
- **Project Dashboard**: https://www.sanity.io/manage/project/wvwhqsyr
- **Hosted Studio**: https://wvwhqsyr.sanity.studio
- **API Settings**: https://www.sanity.io/manage/project/wvwhqsyr/api

### Your Files
- Schema Types: `/studio/schemaTypes/`
- Sanity Client: `/lib/sanity.client.ts`
- GROQ Queries: `/lib/sanity.queries.ts`
- Migration Script: `/scripts/migrate-to-sanity.ts`

---

## 💰 Pricing

**Sanity Free Tier** (Current):
- 3 users
- 10,000 documents
- 5GB assets
- Unlimited API requests

**Perfect for**: Coffee shop menu (100-200 items)

**Upgrade needed when**:
- More than 3 team members
- More than 10k documents (unlikely)
- More than 5GB images

---

## 🔒 Security

### API Tokens
- **Public tokens**: Safe for client-side (reading data)
- **Write tokens**: Keep secret in `.env.local`
- Never commit tokens to git

### CORS
Only add trusted domains to CORS whitelist

### User Roles
- **Administrator**: Full access
- **Editor**: Can edit but not configure
- **Contributor**: Can create drafts only

---

## ✨ Benefits Over JSON Files

### Before (JSON)
- ❌ Need developer to edit
- ❌ Git commit required
- ❌ Deploy needed for changes
- ❌ No preview
- ❌ No version history
- ❌ Risk of syntax errors

### After (Sanity)
- ✅ Anyone can edit
- ✅ No code required
- ✅ Live updates (ISR)
- ✅ Preview changes
- ✅ Full version history
- ✅ Validation prevents errors
- ✅ Image management
- ✅ Rich text editing

---

## 🎯 Next Steps

1. **Get API Token** (5 minutes)
   - Visit https://www.sanity.io/manage/personal/tokens
   - Create "Editor" token
   - Add to `.env.local`

2. **Run Migration** (2 minutes)
   ```bash
   npx tsx scripts/migrate-to-sanity.ts
   ```

3. **Verify Data** (5 minutes)
   - Go to https://wvwhqsyr.sanity.studio
   - Check menu items are there
   - Try editing one

4. **Update Next.js** (1 hour)
   - Modify menu page to use Sanity
   - Test locally
   - Deploy

5. **Train Team** (30 minutes)
   - Show how to edit items
   - Show how to change prices
   - Show how to add new items

---

Ready to migrate your menu to Sanity! Just need that API token 🚀
