import { revalidatePath } from 'next/cache'
import { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateHomepage: GlobalAfterChangeHook = () => {
  revalidatePath('/')
}

export const HomePageConfig: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
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
