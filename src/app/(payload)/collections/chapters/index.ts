import { CollectionConfig } from 'payload'

export const Chapters: CollectionConfig = {
  slug: 'chapters',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      required: true,
      localized: true,
    },
    {
      type: 'relationship',
      name: 'lessons',
      hasMany: true,
      relationTo: 'lessons',
      localized: true,
      admin: {
        isSortable: true,
      },
    },
  ],
}
