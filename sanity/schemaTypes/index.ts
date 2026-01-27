// New simplified schemas (what clients should edit)
import { foodMenuType } from './food-menu'
import { drinksMenuType } from './drinks-menu'
import { seasonalFeaturesType } from './seasonal-features'

// Legacy schemas (keep for reference, hidden from main view)
import { menuItemType } from './menuItem'
import { menuCategoryType } from './menuCategory'
import { menuTabType } from './menuTab'
import { dietaryKeyType } from './dietaryKey'

export const schemaTypes = [
  // Primary schemas - what clients should use
  foodMenuType,
  drinksMenuType,
  seasonalFeaturesType,

  // Legacy schemas (needed for data, but clients should use new schemas above)
  menuItemType,
  menuCategoryType,
  menuTabType,
  dietaryKeyType,
]
