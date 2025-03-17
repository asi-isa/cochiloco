// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './app/(payload)/collections/users'
import { CollectionConfigs } from './app/(payload)/collections'
import { GlobalConfigs } from './app/(payload)/globals'
import { defaultLocale, locales } from './lib/i18n/i18nConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: locales,
    defaultLocale: defaultLocale,
  },
  collections: CollectionConfigs,
  globals: GlobalConfigs,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: [],
      globals: ['home-page'],
      uploadsCollection: 'media',
      tabbedUI: true,
    }),
  ],
})
