import path from 'path'
import { fileURLToPath } from 'url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Landing } from './globals/Landing'
import { seed } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/* Origin del frontend autorizzati a chiamare le API dal browser */
const frontendOrigins = (process.env.FRONTEND_URL || 'http://localhost:3001')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  cors: frontendOrigins,
  csrf: frontendOrigins,
  collections: [Users, Media],
  globals: [Landing],
  editor: lexicalEditor(),
  // In produzione impostare PAYLOAD_SECRET: il fallback serve solo per lo sviluppo locale
  secret: process.env.PAYLOAD_SECRET || 'codever-dev-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./codever.db',
    },
  }),
  sharp,
  onInit: async (payload) => {
    await seed(payload)
  },
})
