import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

const client = createClient({
  url: String(process.env.DB_TURSO_PRIVATE_URL),
  authToken: String(process.env.DB_TURSO_PRIVATE_TOKEN),
})

export const db = drizzle(client)
