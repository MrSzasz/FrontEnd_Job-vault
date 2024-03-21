'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RowActions from '../RowActions/RowActions'
import type { JobColumns } from '@/types/types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { statusColors, statusIcons } from '@/services/statusColors'
import { capitalizeFirst, dateFormatter } from '@/services/functions'

export const columns: Array<ColumnDef<JobColumns>> = [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
          className="text-xs md:text-sm"
        >
          <span className="hidden md:inline">Status</span>
          <ArrowUpDown className="ml-1 h-3 w-3 md:h-4 md:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              <span className={`${statusColors[row.original.status]}`}>
                {statusIcons(row.original.status)}
              </span>
            </TooltipTrigger>
            <TooltipContent asChild>
              <p className="bg-background">
                {capitalizeFirst(row.original.status)}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: 'position',
    header: () => {
      return (
        <div className="flex items-center justify-center text-xs md:text-sm">
          Position <ExternalLink className="ml-1 h-3 w-3" />
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <a
          className={`hover:border-white ${row.original.status === 'expired' && statusColors.expired} border-b-2 border-transparent transition-all `}
          href={row.original.positionLink}
          target="_blank"
          rel="noreferrer"
        >
          {row.original.position}
        </a>
      )
    },
  },
  {
    accessorKey: 'company',
    header: () => {
      return (
        <div className="flex items-center justify-center text-xs md:text-sm">
          Company
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <span
          className={`${row.original.status === 'expired' && statusColors.expired}`}
        >
          {row.original.company}
        </span>
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
          className="text-xs md:text-sm"
        >
          Date
          <ArrowUpDown className="ml-1 h-3 w-3 md:h-4 md:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formattedDate = dateFormatter(row.original.date)
      return (
        <span
          className={`${row.original.status === 'expired' && statusColors.expired}`}
        >
          {formattedDate}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions row={row} />
    },
  },
]
