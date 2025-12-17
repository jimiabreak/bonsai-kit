/**
 * Generate NDJSON file for Sanity import
 *
 * This script reads content/menu.json and creates an .ndjson file
 * that can be imported to Sanity using:
 *
 * cd studio && npx sanity dataset import ../menu-import.ndjson production
 */

const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '..', 'content', 'menu.json');
const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

const ndjson = [];

// Create tabs
const tabs = {
  food: {
    _id: 'tab-food',
    _type: 'menuTab',
    label: 'Food',
    id: { _type: 'slug', current: 'food' },
    sortOrder: 0
  },
  drinks: {
    _id: 'tab-drinks',
    _type: 'menuTab',
    label: 'Drinks',
    id: { _type: 'slug', current: 'drinks' },
    sortOrder: 1
  },
  features: {
    _id: 'tab-features',
    _type: 'menuTab',
    label: 'Features',
    id: { _type: 'slug', current: 'features' },
    sortOrder: 2
  }
};

Object.values(tabs).forEach(tab => ndjson.push(JSON.stringify(tab)));

let catIndex = 0;
let itemIndex = 0;

// Process each tab
for (const [tabKey, tabData] of Object.entries(menuData.tabs)) {
  const tabId = 'tab-' + tabKey;

  if (!tabData || !tabData.categories) {
    console.log(`Skipping ${tabKey} - no categories found`);
    continue;
  }

  // Process categories
  for (const [catKey, catData] of Object.entries(tabData.categories)) {
    if (!catData || !catData.id || !catData.name) {
      console.log(`Skipping category ${catKey} - missing required fields`);
      continue;
    }

    const catId = 'cat-' + catData.id;
    const category = {
      _id: catId,
      _type: 'menuCategory',
      name: catData.name,
      id: { _type: 'slug', current: catData.id },
      tab: { _type: 'reference', _ref: tabId },
      sortOrder: catIndex++
    };

    if (catData.description) {
      category.description = catData.description;
    }

    ndjson.push(JSON.stringify(category));

    // Process items
    if (!catData.items || !Array.isArray(catData.items)) {
      console.log(`Skipping items for ${catData.name} - no items array`);
      continue;
    }

    catData.items.forEach((item, idx) => {
      if (!item || !item.name || !item.price) {
        console.log(`Skipping item - missing name or price`);
        return;
      }

      // Extract dietary info from name (e.g., "SHAKSHUKA (V) (GFA)" -> ["V", "GFA"])
      const dietaryMatch = item.name.match(/\(([A-Z]+)\)/g);
      const dietary = dietaryMatch ? dietaryMatch.map(m => m.replace(/[()]/g, '')) : [];

      // Clean name (remove dietary tags)
      const cleanName = item.name.replace(/\s*\([A-Z]+\)/g, '').trim();

      const menuItem = {
        _id: 'item-' + itemIndex++,
        _type: 'menuItem',
        name: cleanName,
        price: item.price,
        description: item.description || '',
        dietary: dietary,
        status: 'regular',
        category: { _type: 'reference', _ref: catId },
        sortOrder: idx
      };

      ndjson.push(JSON.stringify(menuItem));
    });
  }
}

const outputPath = path.join(__dirname, '..', 'menu-import.ndjson');
fs.writeFileSync(outputPath, ndjson.join('\n'));

console.log('\n✅ Successfully created menu-import.ndjson');
console.log(`📊 Generated ${ndjson.length} documents:`);
console.log(`   - ${Object.keys(tabs).length} tabs`);
console.log(`   - ${catIndex} categories`);
console.log(`   - ${itemIndex} menu items`);
console.log(`\n📝 To import into Sanity:`);
console.log(`   cd studio && npx sanity dataset import ../menu-import.ndjson production\n`);
