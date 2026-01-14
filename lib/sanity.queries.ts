import { defineQuery } from 'next-sanity'

// Query to fetch all menu data in the same structure as menu.json
export const MENU_QUERY = defineQuery(`{
  "lastUpdated": *[
    _type == "menuTab"
  ] | order(_updatedAt desc)[0]._updatedAt,
  "tabs": {
    "food": *[
      _type == "menuTab"
      && tabId == "food"
    ][0]{
      "categories": {
        ...*[
          _type == "menuCategory"
          && references(^._id)
        ] | order(order asc) {
          (id.current): {
            "name": name,
            "id": id.current,
            "items": items[]->{
              name,
              price,
              description
            }
          }
        }[0]
      }
    },
    "drinks": *[
      _type == "menuTab"
      && tabId == "drinks"
    ][0]{
      "categories": {
        ...*[
          _type == "menuCategory"
          && references(^._id)
        ] | order(order asc) {
          (id.current): {
            "name": name,
            "id": id.current,
            "items": items[]->{
              name,
              price,
              description
            }
          }
        }[0]
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
