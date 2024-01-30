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
import { capitalizeFirst } from '@/services/functions'

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
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
        <div className="flex items-center justify-center gap-2">
          Position <ExternalLink size="1em" />
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
    header: 'Company',
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
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span
          className={`${row.original.status === 'expired' && statusColors.expired}`}
        >
          {row.original.date as string}
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
