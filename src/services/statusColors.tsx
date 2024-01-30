import { Check, Clock, Hourglass, Send, X } from 'lucide-react'
import { type statusType } from '@/types/types'

export const statusColors = {
  'send later': 'text-light-blue-500',
  sent: 'text-blue-500',
  rejected: 'text-red-500',
  accepted: 'text-green-500',
  expired: 'text-gray-500 hover:border-gray-500',
}

export const statusIcons = (status: statusType): React.ReactElement => {
  const icons = {
    'send later': <Clock />,
    sent: <Send />,
    rejected: <X />,
    accepted: <Check />,
    expired: <Hourglass />,
  }
  return icons[status]
}
