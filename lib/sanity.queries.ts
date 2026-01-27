import { defineQuery } from 'next-sanity'

/**
 * Menu query - pulls from menuCategory documents with items
 * Categories are grouped by name into food/drinks
 */
export const MENU_QUERY = defineQuery(`{
  "lastUpdated": *[_type == "menuCategory" && count(items) > 0] | order(_updatedAt desc)[0]._updatedAt,
  "tabs": {
    "food": {
      "categories": *[
        _type == "menuCategory"
        && count(items) > 0
        && name in ["Savory", "Sweet", "Bowls", "Sandwich", "Simple", "Greens", "Sides"]
      ] | order(order asc) {
        name,
        "id": lower(name),
        "items": items[]->{
          name,
          price,
          description
        }
      }
    },
    "drinks": {
      "categories": *[
        _type == "menuCategory"
        && count(items) > 0
        && name in ["Drip Coffee", "Espresso Drinks", "Tea & More", "Monthly Features"]
      ] | order(order asc) {
        name,
        "id": lower(name),
        "items": items[]->{
          name,
          price,
          description
        }
      }
    },
    "features": *[_type == "menuTab" && tabId == "features"][0]{
      name,
      "items": items[]->{
        name,
        price,
        description
      }
    }
  }
}`)

/**
 * Legacy menu query (for migration period)
 * Works with old reference-based schema
 */
export const MENU_QUERY_LEGACY = defineQuery(`{
  "lastUpdated": *[
    _type == "menuTab"
  ] | order(_updatedAt desc)[0]._updatedAt,
  "tabs": {
    "food": *[
      _type == "menuTab"
      && tabId == "food"
    ][0]{
      "categories": *[
        _type == "menuCategory"
        && references(^._id)
      ] | order(order asc) {
        name,
        "id": id.current,
        "items": items[]->{
          name,
          price,
          description
        }
      }
    },
    "drinks": *[
      _type == "menuTab"
      && tabId == "drinks"
    ][0]{
      "categories": *[
        _type == "menuCategory"
        && references(^._id)
      ] | order(order asc) {
        name,
        "id": id.current,
        "items": items[]->{
          name,
          price,
          description
        }
      }
    },
    "features": *[
      _type == "menuTab"
      && tabId == "features"
    ][0]{
      name,
      "items": items[]->{
        name,
        price,
        description
      }
    }
  },
  "dietaryKey": {
    ...*[
      _type == "dietaryKey"
    ] | order(order asc) {
      (abbreviation): fullName
    }[0]
  }
}`)
