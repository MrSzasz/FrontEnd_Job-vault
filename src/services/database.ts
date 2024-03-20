import { createClient } from '@libsql/client'

export const client = createClient({
  url: String(process.env.DB_TURSO_PRIVATE_URL),
  authToken: String(process.env.DB_TURSO_PRIVATE_TOKEN),
})
