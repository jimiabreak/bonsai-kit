/**
 * Menu utility functions for formatting and displaying menu items
 */

/**
 * Format item name with dietary tags appended
 * @example formatItemName("FRENCH TOAST", ["V", "GF"]) → "FRENCH TOAST (V) (GF)"
 */
export function formatItemName(name: string, dietaryTags?: string[]): string {
  const tags = dietaryTags?.filter((t) => t && t !== 'none')
  if (!tags?.length) return name
  return `${name} (${tags.join(') (')})`
}

/**
 * Hardcoded dietary key legend
 * No longer fetched from Sanity - these values rarely change
 */
export const DIETARY_KEY: Record<string, string> = {
  V: 'Vegetarian',
  VG: 'Vegan',
  GF: 'Gluten Free',
  GFA: 'Gluten Free Available',
  CSO: 'Contains Sesame Oil',
}

/**
 * Get dietary key entries as an array for rendering
 */
export function getDietaryKeyEntries(): Array<{ abbreviation: string; fullName: string }> {
  return Object.entries(DIETARY_KEY).map(([abbreviation, fullName]) => ({
    abbreviation,
    fullName,
  }))
}
