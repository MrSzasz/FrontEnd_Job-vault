import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey().notNull().unique(),
  status: text('status').notNull(),
  position: text('position').notNull(),
  positionLink: text('positionLink').notNull(),
  company: text('company').notNull(),
  description: text('description').notNull(),
  requirements: text('requirements').notNull(),
  extra: text('extra'),
  date: text('date').notNull(),
  cv: text('cv'),
  letter: text('letter'),
  userEmail: text('userEmail').notNull(),
})

text('status', {
  enum: ['send later', 'sent', 'rejected', 'accepted', 'expired'],
})
