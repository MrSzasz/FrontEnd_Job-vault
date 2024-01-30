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
import { getAllJobsInLocalStorage } from '@/services/handleJobs'
import { downloadJobsData } from '@/services/fileConverter'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
}

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>): React.ReactElement => {
  const { isLoading } = useContext(JobsContext)
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
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleDownloadData = (csv: boolean): void => {
    const jobs = getAllJobsInLocalStorage()

    downloadJobsData(jobs, csv)
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
              <TableCell colSpan={2}></TableCell>
              <TableCell colSpan={3} className="text-right">
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
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

export default DataTable
