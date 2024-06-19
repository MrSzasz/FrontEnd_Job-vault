'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

import { useContext, useState } from 'react'
import AddJobForm from '../AddJobForm/AddJobForm'
import { JobsContext } from '@/context/JobContext'
import { Download } from 'lucide-react'
import { downloadJobsData } from '@/services/fileConverter'
import type { DownloadedJobs } from '@/types/types'
import { dateFormatter } from '@/services/functions'
import { Button } from '../ui/button'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
}

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): React.ReactElement => {
  const { isLoading, jobs: currentJobs } = useContext(JobsContext)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleDownloadData = (csv: boolean): void => {
    const jobsToDownload: DownloadedJobs[] = []

    currentJobs.forEach(job => {
      jobsToDownload.push({
        status: job.status,
        position: job.position,
        positionLink: job.positionLink,
        company: job.company,
        description: job.description,
        requirements: job.requirements,
        extra: job.extra,
        date: dateFormatter(job.date),
        cv: job.cv,
        letter: job.letter,
      })
    })

    downloadJobsData(jobsToDownload, csv)
  }

  return (
    <div className="rounded-md border">
      <div className="flex flex-col-reverse items-center justify-between gap-4 p-4 md:flex-row">
        <Input
          placeholder="Filter positions..."
          value={
            (table.getColumn('position')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('position')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <AddJobForm />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length !== 0 ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {isLoading ? (
                  <span className="animate-pulse">Loading data...</span>
                ) : (
                  'No jobs yet, add one clicking on the "Add Job" button.'
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {!isLoading && (
          <TableFooter className="bg-inherit">
            <TableRow>
              <TableCell colSpan={3} className='text-start pl-4'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex w-fit items-end justify-center gap-2">
                      <Download />
                      Download data
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        handleDownloadData(false)
                      }}
                      className="cursor-pointer"
                    >
                      Download as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleDownloadData(true)
                      }}
                      className="cursor-pointer"
                    >
                      Download as CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </TableCell>
              <TableCell colSpan={2} className="text-right">
                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { table.previousPage(); }}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { table.nextPage(); }}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

export default DataTable
