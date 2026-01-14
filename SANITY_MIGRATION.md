# Migrating Menu Data to Sanity

## Overview
The menu page now fetches data from Sanity in real-time. You need to migrate the existing menu.json data into Sanity Studio.

## Step 1: Start Sanity Studio Locally

```bash
npm run dev
```

Then visit: http://localhost:3000/admin

## Step 2: Create Dietary Keys

Go to **Dietary Key** in Sanity Studio and create these entries:

| Abbreviation | Full Name | Display Order |
|--------------|-----------|---------------|
| VG | Vegan | 0 |
| V | Vegetarian | 1 |
| GF | Gluten Free | 2 |
| GFA | Gluten Free Available | 3 |
| CSO | Contains Seed Oil | 4 |

## Step 3: Create Menu Tabs

Go to **Menu Tab** and create these 3 documents:

### Tab 1: Food
- **Tab ID**: food
- **Display Order**: 0
- (Categories will be added in the next step)

### Tab 2: Drinks
- **Tab ID**: drinks
- **Display Order**: 1
- (Categories will be added in the next step)

### Tab 3: Features
- **Tab ID**: features
- **Tab Name**: Winter '26
- **Display Order**: 2
- (Items will be added later)

## Step 4: Create Categories for Food Tab

Create these categories with their display orders:

| Category Name | Category ID | Display Order |
|--------------|-------------|---------------|
| Savory | savory | 0 |
| Sweet | sweet | 1 |
| Bowls | bowls | 2 |
| Sandwich | sandwich | 3 |
| Simple | simple | 4 |
| Greens | greens | 5 |
| Sides | sides | 6 |

## Step 5: Create Categories for Drinks Tab

| Category Name | Category ID | Display Order |
|--------------|-------------|---------------|
| Monthly Features | monthly-features | 0 |
| Drip Coffee | drip-coffee | 1 |
| Espresso Drinks | espresso-drinks | 2 |
| Tea & More | tea-more | 3 |

## Step 6: Add Menu Items

For each category, create **Menu Items** with:
- Name
- Price
- Description (optional)

Then add these items to the category's **Menu Items** array.

### Example: Savory Category Items
1. COMMON BREAKFAST (GFA) - $23
2. COMMON D.O.P. SCRAMBLE (GFA) - $21
3. WAGYU + EGGS (GF) - $36
... etc.

## Step 7: Link Categories to Tabs

1. Go back to the **Food** tab document
2. In the **Categories** field, add references to all food categories (in order)
3. Go to the **Drinks** tab document
4. In the **Categories** field, add references to all drink categories (in order)

## Step 8: Add Features Items

1. Create menu items for the features (Winter '26):
   - POTATO LEEK SOUP (VG) (GFA) - $8/11
   - BUTTER CHICKEN (GFA) - $24
   - LAMB SHAWARMA BOWL (GF) - $25
   - RICOTTA + PISTACHIO TOAST (V) (GFA) - $18
   - BANANA TARTE TATIN (V) - $19

2. Go to the **Features** tab document
3. Add these items to the **Items** array (in order)

## Step 9: Test the Integration

1. Visit http://localhost:3000/menu
2. You should see the menu loading from Sanity
3. Make a small change in Sanity Studio (e.g., edit a price)
4. The change should appear immediately on the menu page without refreshing!

## Automated Migration Script (Optional)

If you prefer to script this, I can provide a Node.js script that reads menu.json and creates all documents in Sanity automatically. Let me know if you'd like this.

## Troubleshooting

### Menu shows but doesn't update in real-time
- Check browser console for errors
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env.local`
- Verify you're on the correct dataset (production)

### Menu doesn't show at all
- The fallback to menu.json is built-in, so the page should still work
- Check Sanity Studio to ensure documents are published (not drafts)

### Environment Variables Required

Make sure `.env.local` contains:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=wvwhqsyr
NEXT_PUBLIC_SANITY_DATASET=production
```

These same variables must be added to Vercel for production.
