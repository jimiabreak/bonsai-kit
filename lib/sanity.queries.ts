import { defineQuery } from 'next-sanity'

/**
 * GROQ Queries for Commonwealth Coffee
 *
 * These queries fetch content from Sanity CMS
 */

// Get all menu tabs with their categories and items
export const MENU_QUERY = defineQuery(`*[
  _type == "menuTab"
] | order(sortOrder asc) {
  _id,
  label,
  "id": id.current,
  sortOrder,
  "categories": *[
    _type == "menuCategory"
    && references(^._id)
  ] | order(sortOrder asc) {
    _id,
    name,
    "id": id.current,
    description,
    sortOrder,
    "items": *[
      _type == "menuItem"
      && references(^._id)
    ] | order(sortOrder asc, name asc) {
      _id,
      name,
      price,
      description,
      dietary,
      status,
      "image": image.asset->url,
      sortOrder
    }
  }
}`)

// Get a single tab by ID
export const MENU_TAB_QUERY = defineQuery(`*[
  _type == "menuTab"
  && id.current == $tabId
][0] {
  _id,
  label,
  "id": id.current,
  sortOrder,
  "categories": *[
    _type == "menuCategory"
    && references(^._id)
  ] | order(sortOrder asc) {
    _id,
    name,
    "id": id.current,
    description,
    sortOrder,
    "items": *[
      _type == "menuItem"
      && references(^._id)
    ] | order(sortOrder asc, name asc) {
      _id,
      name,
      price,
      description,
      dietary,
      status,
      "image": image.asset->url,
      sortOrder
    }
  }
}`)

// Get all FAQ items
export const FAQ_QUERY = defineQuery(`*[
  _type == "faqItem"
] | order(sortOrder asc) {
  _id,
  question,
  answer,
  sortOrder
}`)

// Get contact information (singleton)
export const CONTACT_QUERY = defineQuery(`*[
  _type == "contactInfo"
][0] {
  _id,
  address,
  phone,
  email,
  hours
}`)

// Get menu items by category
export const MENU_ITEMS_BY_CATEGORY_QUERY = defineQuery(`*[
  _type == "menuItem"
  && category->id.current == $categoryId
] | order(sortOrder asc, name asc) {
  _id,
  name,
  price,
  description,
  dietary,
  status,
  "image": image.asset->url,
  "category": category->{
    name,
    "id": id.current
  }
}`)

// Get new menu items (for features/highlights)
export const NEW_MENU_ITEMS_QUERY = defineQuery(`*[
  _type == "menuItem"
  && status == "new"
] | order(_createdAt desc) [0...10] {
  _id,
  name,
  price,
  description,
  dietary,
  status,
  "image": image.asset->url,
  "category": category->{
    name,
    "id": id.current
  }
}`)

// Search menu items by name
export const SEARCH_MENU_ITEMS_QUERY = defineQuery(`*[
  _type == "menuItem"
  && name match $searchTerm
] | order(name asc) {
  _id,
  name,
  price,
  description,
  dietary,
  status,
  "image": image.asset->url,
  "category": category->{
    name,
    "id": id.current
  }
}`)
