# Sanity Content Migration Guide

## ✅ Files Ready

### Schema Types (Studio)
All schema types follow Sanity best practices:
- ✅ Use `defineField`, `defineType`, `defineArrayMember`
- ✅ Validation rules in arrays
- ✅ `status` field instead of `boolean` (with radio layout)
- ✅ All required fields have descriptive error messages
- ✅ Fields ordered by importance

**Location**: `/studio/schemaTypes/`

### GROQ Queries (Next.js)
All queries use `defineQuery` and proper formatting:
- ✅ `SCREAMING_SNAKE_CASE` variable names
- ✅ Each filter segment on own line
- ✅ Parameters instead of string interpolation
- ✅ All required attributes explicitly listed

**Location**: `/lib/sanity.queries.ts`

### Migration Data
NDJSON file ready for import:
- ✅ 3 tabs (Food, Drinks, Features)
- ✅ 11 categories
- ✅ 52 menu items

**Location**: `/menu-import.ndjson`

---

## 📝 Migration Steps

### Step 1: Import Content to Sanity

```bash
cd studio
npx sanity dataset import ../menu-import.ndjson production
```

**Expected Output**:
```
✔ Importing documents...
✔ Strengthening references...
✔ Import completed

Documents imported: 66
```

### Step 2: Verify in Studio

**Option A: Hosted Studio** (Recommended)
```
https://wvwhqsyr.sanity.studio
```

**Option B: Local Studio** (After Node version fix)
```bash
cd studio
npm run dev
# Visit http://localhost:3333
```

### Step 3: Check Content

In the studio:
1. Click "Menu Tab" - should see 3 tabs
2. Click "Menu Category" - should see 11 categories
3. Click "Menu Item" - should see 52 items
4. Verify relationships are correct

---

## 🔍 What Was Fixed

### Schema Changes

**Before** (Violated agent rules):
```typescript
// ❌ Used boolean
isNew: {
  type: 'boolean',
  initialValue: false
}

// ❌ Validation not in array
validation: (Rule) => Rule.required()
```

**After** (Following agent rules):
```typescript
// ✅ String field with radio layout
status: {
  type: 'string',
  options: {
    list: [
      {title: 'Regular', value: 'regular'},
      {title: 'New', value: 'new'},
      {title: 'Seasonal', value: 'seasonal'},
    ],
    layout: 'radio'  // Required for <5 options
  }
}

// ✅ Validation in array with descriptive errors
validation: (Rule) => [
  Rule.required().error('Item name is required to display on the menu'),
  Rule.max(100).warning('Item name should be concise (under 100 characters)'),
]
```

### Query Changes

**Before**:
```typescript
// ❌ Used groq, not defineQuery
import { groq } from 'next-sanity'
export const MENU_QUERY = groq`*[_type == "menuTab"]...`
```

**After**:
```typescript
// ✅ Uses defineQuery with proper formatting
import { defineQuery } from 'next-sanity'
export const MENU_QUERY = defineQuery(`*[
  _type == "menuTab"
] | order(sortOrder asc) {
  _id,
  label,
  ...
}`)
```

### Migration Approach

**Before**:
```typescript
// ❌ TypeScript script with API calls
const item = await client.create({...})
```

**After**:
```javascript
// ✅ NDJSON file for CLI import
{"_id":"item-1","_type":"menuItem","name":"SHAKSHUKA"...}
{"_id":"item-2","_type":"menuItem","name":"BENEDICT"...}
```

---

## 🎨 Field Explanations

### Menu Item Status
Instead of a simple "new" boolean, we use a status field that supports:
- `regular` - Standard menu item
- `new` - Highlighted as new
- `seasonal` - Marked as seasonal/limited time

This is more flexible and follows Sanity's "model what things are" principle.

### Dietary Information
Array of strings with predefined options:
- `V` - Vegetarian
- `VE` - Vegan
- `GF` - Gluten Free
- `GFA` - Gluten Free Available
- `CSO` - Choose Side Option

### Sort Order
Numeric field that determines display order:
- Lower numbers appear first
- Allows easy reordering without changing timestamps
- Default is 0

---

## 📊 Data Structure

### Hierarchy
```
menuTab (Food, Drinks, Features)
└── menuCategory (Savory, Sweet, Bowls, etc.)
    └── menuItem (SHAKSHUKA, BENEDICT, etc.)
```

### Relationships
- Each `menuCategory` references one `menuTab`
- Each `menuItem` references one `menuCategory`
- Categories can be moved between tabs by changing the reference
- Items can be moved between categories by changing the reference

---

## 🔧 Regenerating NDJSON

If you need to regenerate the import file:

```bash
node scripts/generate-ndjson.js
```

This reads `content/menu.json` and creates fresh `menu-import.ndjson`.

**Use this when**:
- You've updated `menu.json` and want to re-import
- You want to reset Sanity to match your JSON
- You're setting up a new dataset

---

## ✨ After Migration

Once content is imported, you can:

1. **Edit in Studio**
   - Update prices
   - Add new items
   - Mark seasonal items
   - Reorder menus

2. **Query in Next.js**
   ```typescript
   import { client } from '@/lib/sanity.client'
   import { MENU_QUERY } from '@/lib/sanity.queries'

   const menuData = await client.fetch(MENU_QUERY)
   ```

3. **Enable ISR**
   ```typescript
   export const revalidate = 60 // seconds
   ```

4. **Deploy Studio**
   ```bash
   cd studio
   npx sanity deploy
   ```

---

## 🚨 Important Notes

### Don't Modify `_id` Fields
The NDJSON uses predictable IDs like `item-1`, `cat-food-savory`, etc.
If you re-import, these will UPDATE existing documents, not create duplicates.

### References Must Exist
Items reference categories, categories reference tabs.
Import in order: tabs → categories → items (the NDJSON is already ordered correctly).

### Dietary Tags Auto-Extracted
The migration script automatically extracts dietary info from item names:
- "SHAKSHUKA (V) (GFA)" → `dietary: ["V", "GFA"]`, `name: "SHAKSHUKA"`

---

## 📚 Resources

**Sanity Documentation**:
- [Content Modeling](https://www.sanity.io/docs/content-modeling)
- [GROQ Queries](https://www.sanity.io/docs/groq)
- [Data Import](https://www.sanity.io/docs/importing-data)

**Project Files**:
- Schema: `/studio/schemaTypes/`
- Queries: `/lib/sanity.queries.ts`
- Import Data: `/menu-import.ndjson`
- Generator: `/scripts/generate-ndjson.js`

**Your Studio**:
- Hosted: https://wvwhqsyr.sanity.studio
- Project: https://www.sanity.io/manage/project/wvwhqsyr

---

Ready to import! Just run the import command above 🚀
