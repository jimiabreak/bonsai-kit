// Menu schemas (what clients edit in Studio)
import { menuItemType } from './menuItem'
import { menuCategoryType } from './menuCategory'
import { menuTabType } from './menuTab'
import { dietaryKeyType } from './dietaryKey'

// Note: Simplified schemas (foodMenu, drinksMenu, seasonalFeatures)
// are available in ./food-menu.ts, ./drinks-menu.ts, ./seasonal-features.ts
// if you want to migrate to them in the future.

export const schemaTypes = [
  menuTabType,
  menuCategoryType,
  menuItemType,
  dietaryKeyType,
]
