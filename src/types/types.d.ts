export type statusType =
  | 'send later'
  | 'sent'
  | 'rejected'
  | 'accepted'
  | 'expired'

export interface JobColumns {
  id: string
  status: statusType
  position: string
  positionLink: string
  company: string
  description: string
  requirements: string
  extra?: string | null | undefined
  date: string | Date
  cv?: string | null | undefined
  letter?: string | null | undefined
}

/*

CREATE TABLE users(
  user_id TEXT PRIMARY KEY NOT NULL UNIQUE,
  user_name TEXT NOT NULL,
)

CREATE TABLE jobs(
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  status TEXT NOT NULL,
  position TEXT NOT NULL,
  positionLink TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  extra TEXT,
  date TEXT NOT NULL,
  cv TEXT,
  letter TEXT,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)

*/
