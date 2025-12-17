# Commonwealth Coffee - Quick Start Guide

## 🎯 What's Been Set Up

### ✅ Shopify Subscriptions (READY)
- 4 products configured
- Checkout flow working
- API tested and healthy

### ✅ Sanity CMS (READY TO MIGRATE)
- Schema created for menu system
- Next.js client configured
- Migration script ready

---

## 🚀 Next 3 Steps

### 1. Get Sanity API Token (5 min)

```bash
# Visit this URL:
https://www.sanity.io/manage/personal/tokens

# Create token with "Editor" permissions
# Add to .env.local:
SANITY_API_TOKEN=your_token_here
```

### 2. Migrate Your Menu (2 min)

```bash
npx tsx scripts/migrate-to-sanity.ts
```

This creates 100+ menu items in Sanity.

### 3. Access Studio

Visit: **https://wvwhqsyr.sanity.studio**

Start editing your menu visually!

---

## 📁 File Structure

```
commonwealth-website/
├── studio/                    # Sanity Studio
│   ├── schemaTypes/          # Content schemas
│   │   ├── menuItem.ts       # Menu items
│   │   ├── menuCategory.ts   # Categories
│   │   ├── menuTab.ts        # Tabs
│   │   ├── faqItem.ts        # FAQ
│   │   └── contactInfo.ts    # Contact
│   └── sanity.config.ts      # Studio config
│
├── lib/
│   ├── shopify.ts            # Shopify API
│   ├── shopify-test.ts       # Shopify tests
│   ├── sanity.client.ts      # Sanity client
│   ├── sanity.queries.ts     # GROQ queries
│   └── sanity.image.ts       # Image helpers
│
├── scripts/
│   ├── test-shopify.ts       # Test Shopify
│   └── migrate-to-sanity.ts  # Migrate menu
│
└── docs/
    ├── SHOPIFY_SETUP.md      # Shopify guide
    ├── SANITY_SETUP.md       # Sanity guide
    └── QUICK_START.md        # This file
```

---

## 🧪 Testing

### Test Shopify
```bash
npx tsx scripts/test-shopify.ts
```

Expected: ✅ All tests pass

### Test Sanity (after migration)
1. Visit https://wvwhqsyr.sanity.studio
2. Check menu items exist
3. Try editing one
4. Publish changes

---

## 📚 Documentation

**Detailed Guides**:
- [Shopify Setup](./SHOPIFY_SETUP.md) - Complete Shopify status
- [Sanity Setup](./SANITY_SETUP.md) - Migration & usage guide
- [Sanity Next Steps](./SANITY_NEXT_STEPS.md) - Original plan

**Agent Instructions**:
- `agents/headless-shopify-agent.md` - Shopify best practices
- `agents/sanity-agent.md` - Sanity content modeling

---

## 🎓 Common Tasks

### Update Menu Price
1. Go to https://wvwhqsyr.sanity.studio
2. Click "Menu Item"
3. Find item
4. Change price
5. Publish
6. Live in ~60 seconds

### Add New Menu Item
1. Click "Menu Item" > "Create new"
2. Fill in name, price, description
3. Select category
4. Add dietary tags (V, GF, etc.)
5. Publish

### Test Subscription
1. Visit `/subscription` on your site
2. Click "SIGN UP"
3. Complete checkout on Shopify
4. Verify in Shopify Admin

---

## 🆘 Help

**Shopify Issues**:
- Check `docs/SHOPIFY_SETUP.md`
- Run `npx tsx scripts/test-shopify.ts`
- Verify in https://nz4bfs-cv.myshopify.com/admin

**Sanity Issues**:
- Check `docs/SANITY_SETUP.md`
- Visit https://www.sanity.io/manage/project/wvwhqsyr
- Check CORS settings if data not loading

**General Questions**:
- Read the detailed docs
- Check agent markdown files
- Review code comments

---

## ✨ What You Get

### With Shopify
- ✅ Subscription billing
- ✅ Secure payments
- ✅ Customer portal
- ✅ Automatic emails
- ✅ Tax calculations
- ✅ Shipping management

### With Sanity
- ✅ Visual menu editor
- ✅ No code required
- ✅ Live updates (ISR)
- ✅ Version history
- ✅ Image management
- ✅ Search & filter
- ✅ Team collaboration

---

## 🎯 Success Criteria

- [x] Shopify API working
- [x] Subscription products configured
- [x] Sanity schemas created
- [x] Next.js client configured
- [x] Migration script ready
- [ ] API token obtained
- [ ] Menu migrated to Sanity
- [ ] Studio deployed
- [ ] Team trained

---

Almost there! Just need to run that migration 🚀
