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
  userEmail: string
}
