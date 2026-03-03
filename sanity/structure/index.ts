import type { StructureBuilder } from 'sanity/structure'

const SINGLETONS = ['siteSettings', 'homePage', 'header', 'footer', 'redirects']

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(() => '🏠')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.divider(),

      S.documentTypeListItem('page').title('Pages'),

      S.divider(),

      S.listItem()
        .title('Menu')
        .icon(() => '🍽')
        .child(
          S.list()
            .title('Menu')
            .items([
              S.documentTypeListItem('menuCategory').title('Categories'),
              S.documentTypeListItem('menuItem').title('Items'),
            ])
        ),

      S.listItem()
        .title('Content Library')
        .icon(() => '📚')
        .child(
          S.list()
            .title('Content Library')
            .items([
              S.documentTypeListItem('teamMember').title('Team'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('faqItem').title('FAQ'),
              S.documentTypeListItem('galleryImage').title('Gallery'),
            ])
        ),

      S.documentTypeListItem('submission').title('Submissions').icon(() => '📩'),

      S.divider(),

      S.listItem()
        .title('Site')
        .icon(() => '⚙')
        .child(
          S.list()
            .title('Site')
            .items([
              S.listItem()
                .title('Settings')
                .icon(() => '⚙')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Header')
                .icon(() => '🔝')
                .child(S.document().schemaType('header').documentId('header')),
              S.listItem()
                .title('Footer')
                .icon(() => '🔻')
                .child(S.document().schemaType('footer').documentId('footer')),
              S.listItem()
                .title('Redirects')
                .icon(() => '↪')
                .child(S.document().schemaType('redirects').documentId('redirects')),
            ])
        ),
    ])

export const newDocumentOptions = (prev: { templateId: string }[]) =>
  prev.filter(({ templateId }) => !SINGLETONS.includes(templateId))
