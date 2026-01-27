import { defineQuery } from 'next-sanity'

/**
 * New simplified menu query
 * Works with inline schema (foodMenu, drinksMenu, seasonalFeatures)
 */
export const MENU_QUERY = defineQuery(`{
  "lastUpdated": *[_type in ["foodMenu", "drinksMenu", "seasonalFeatures"]]
    | order(_updatedAt desc)[0]._updatedAt,
  "tabs": {
    "food": *[_type == "foodMenu"][0]{
      "categories": categories[]{
        name,
        "id": lower(name),
        "items": items[]{
          name,
          dietaryTags,
          price,
          description
        }
      }
    },
    "drinks": *[_type == "drinksMenu"][0]{
      "categories": categories[]{
        name,
        "id": lower(name),
        "items": items[]{
          name,
          dietaryTags,
          price,
          description
        }
      }
    },
    "features": *[_type == "seasonalFeatures"][0]{
      "name": seasonName,
      "items": items[]{
        name,
        dietaryTags,
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
