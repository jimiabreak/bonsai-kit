/**
 * Import data to Sanity via API
 *
 * This bypasses the CLI and imports directly via HTTP API
 * Usage: npx tsx scripts/import-via-api.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const projectId = 'wvwhqsyr'
const dataset = 'production'
const apiVersion = '2024-01-01'

// You'll need a token with write permissions
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ ERROR: SANITY_API_TOKEN not set in .env.local')
  console.log('\n📝 To get a token:')
  console.log('1. Go to https://www.sanity.io/manage/personal/tokens')
  console.log('2. Create a new token with "Editor" permissions')
  console.log('3. Add to .env.local: SANITY_API_TOKEN=your_token_here\n')
  process.exit(1)
}

async function importData() {
  console.log('🚀 Starting import via Sanity API...\n')

  // Read NDJSON file
  const ndjsonPath = path.join(process.cwd(), 'menu-import.ndjson')
  if (!fs.existsSync(ndjsonPath)) {
    console.error(`❌ ERROR: menu-import.ndjson not found at ${ndjsonPath}`)
    console.log('\nRun this first: node scripts/generate-ndjson.js\n')
    process.exit(1)
  }

  const lines = fs.readFileSync(ndjsonPath, 'utf-8').split('\n').filter(Boolean)
  console.log(`📖 Loaded ${lines.length} documents from menu-import.ndjson\n`)

  const docs = lines.map(line => JSON.parse(line))

  // Create mutations for bulk import
  const mutations = docs.map(doc => ({
    createOrReplace: doc
  }))

  // Import in batches of 100
  const batchSize = 100
  let imported = 0

  for (let i = 0; i < mutations.length; i += batchSize) {
    const batch = mutations.slice(i, i + batchSize)

    try {
      const response = await fetch(
        `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ mutations: batch }),
        }
      )

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`HTTP ${response.status}: ${error}`)
      }

      const result = await response.json()
      imported += batch.length

      console.log(`✅ Imported ${imported}/${mutations.length} documents`)
    } catch (error) {
      console.error(`❌ Batch ${i / batchSize + 1} failed:`, error)
      throw error
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✨ Import Complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`📊 Imported ${imported} documents`)
  console.log(`\n🔍 View your data:`)
  console.log(`   https://www.sanity.io/manage/project/${projectId}/vision`)
  console.log(`\n📝 Query example:`)
  console.log(`   *[_type == "menuItem"][0...10]`)
  console.log(`\n🎉 Your menu is now in Sanity!\n`)
}

importData().catch((error) => {
  console.error('\n❌ Import failed:', error)
  process.exit(1)
})
