import { GlobalConfig } from 'payload'

export const CourseStructure: GlobalConfig = {
  slug: 'course-structure',
  fields: [
    {
      type: 'relationship',
      name: 'chapters',
      hasMany: true,
      relationTo: 'chapters',
      localized: true,
      admin: {
        isSortable: true,
      },
    },
  ],
}
