/**
 * Migration Script: JSON to Sanity
 *
 * This script migrates menu content from content/menu.json to Sanity CMS
 * Usage: npx tsx scripts/migrate-to-sanity.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wvwhqsyr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need a write token
})

interface MenuItem {
  name: string
  price: string
  description?: string
}

interface MenuCategory {
  name: string
  id: string
  items: MenuItem[]
}

interface MenuTabData {
  categories: Record<string, MenuCategory>
}

interface MenuData {
  lastUpdated: string
  tabs: Record<string, MenuTabData>
}

async function migrate() {
  console.log('🚀 Starting migration from JSON to Sanity...\n')

  // Check for auth token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ ERROR: SANITY_API_TOKEN not set in .env.local')
    console.log('\n📝 To get a token:')
    console.log('1. Go to https://www.sanity.io/manage/personal/tokens')
    console.log('2. Create a new token with "Editor" permissions')
    console.log('3. Add to .env.local: SANITY_API_TOKEN=your_token_here\n')
    process.exit(1)
  }

  // Read menu.json
  const menuPath = path.join(process.cwd(), 'content', 'menu.json')
  if (!fs.existsSync(menuPath)) {
    console.error(`❌ ERROR: menu.json not found at ${menuPath}`)
    process.exit(1)
  }

  const menuData: MenuData = JSON.parse(fs.readFileSync(menuPath, 'utf-8'))
  console.log(`📖 Loaded menu data from ${menuPath}`)
  console.log(`   Last updated: ${menuData.lastUpdated}\n`)

  const tabsToCreate = Object.entries(menuData.tabs)
  console.log(`📊 Found ${tabsToCreate.length} tabs to migrate\n`)

  let tabCount = 0
  let categoryCount = 0
  let itemCount = 0

  // Create tabs, categories, and items
  for (const [tabKey, tabData] of tabsToCreate) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`📑 Processing tab: ${tabKey.toUpperCase()}`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

    // Create tab
    const tab = await client.create({
      _type: 'menuTab',
      label: tabKey.charAt(0).toUpperCase() + tabKey.slice(1),
      id: { _type: 'slug', current: tabKey },
      sortOrder: tabCount,
    })
    console.log(`✅ Created tab: ${tab.label} (${tab._id})`)
    tabCount++

    const categoriesToCreate = Object.entries(tabData.categories)
    console.log(`   Categories: ${categoriesToCreate.length}`)

    for (const [categoryKey, categoryData] of categoriesToCreate) {
      // Create category
      const category = await client.create({
        _type: 'menuCategory',
        name: categoryData.name,
        id: { _type: 'slug', current: categoryData.id },
        tab: { _type: 'reference', _ref: tab._id },
        sortOrder: categoryCount,
      })
      console.log(`\n   📁 Created category: ${category.name} (${category._id})`)
      categoryCount++

      console.log(`      Items: ${categoryData.items.length}`)

      // Create items
      for (let i = 0; i < categoryData.items.length; i++) {
        const itemData = categoryData.items[i]

        // Extract dietary info from name (e.g., "SHAKSHUKA (V) (GFA)" -> ["V", "GFA"])
        const dietaryMatch = itemData.name.match(/\(([A-Z]+)\)/g)
        const dietary = dietaryMatch
          ? dietaryMatch.map((m) => m.replace(/[()]/g, ''))
          : []

        // Clean name (remove dietary tags)
        const cleanName = itemData.name.replace(/\s*\([A-Z]+\)/g, '').trim()

        const item = await client.create({
          _type: 'menuItem',
          name: cleanName,
          price: itemData.price,
          description: itemData.description || '',
          dietary: dietary,
          category: { _type: 'reference', _ref: category._id },
          isNew: false,
          sortOrder: i,
        })

        console.log(`      ✓ ${cleanName} - $${itemData.price}`)
        itemCount++
      }
    }
  }

  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✨ Migration Complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`📊 Summary:`)
  console.log(`   Tabs created: ${tabCount}`)
  console.log(`   Categories created: ${categoryCount}`)
  console.log(`   Items created: ${itemCount}`)
  console.log(`\n🎉 Your menu is now in Sanity!`)
  console.log(`\n📝 Next steps:`)
  console.log(`   1. Visit https://www.sanity.io/manage/project/wvwhqsyr`)
  console.log(`   2. Or deploy your studio locally (after Node version fix)`)
  console.log(`   3. Start editing your menu in the visual editor!\n`)
}

migrate().catch((error) => {
  console.error('\n❌ Migration failed:', error)
  process.exit(1)
})
