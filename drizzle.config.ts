import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'turso',
  dbCredentials: {
    url: String(process.env.DB_TURSO_PRIVATE_URL),
    authToken: String(process.env.DB_TURSO_PRIVATE_TOKEN),
  },
} satisfies Config
