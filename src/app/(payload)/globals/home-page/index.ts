import { revalidatePath } from 'next/cache'
import { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateHomepage: GlobalAfterChangeHook = () => {
  revalidatePath('/')
}

export const HomePageConfig: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: {
    livePreview: {
      url: '/',
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
      ],
    },
  },
  hooks: {
    afterChange: [revalidateHomepage],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
