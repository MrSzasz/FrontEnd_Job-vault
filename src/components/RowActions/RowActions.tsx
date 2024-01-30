'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Row } from '@tanstack/react-table'
import { type JobColumns } from '@/types/types'
import { useContext, useState } from 'react'
import { JobsContext } from '@/context/JobContext'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import EditJobForm from '../EditJobForm/EditJobForm'
import ShowJobInfo from '../ShowJobInfo/ShowJobInfo'

const RowActions = ({ row }: { row: Row<JobColumns> }): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { handleDeleteJob } = useContext(JobsContext)

  const handleSetOpen = (): void => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                setIsEdit(false)
              }}
              className="cursor-pointer"
            >
              Show more
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                setIsEdit(true)
              }}
              className="cursor-pointer"
            >
              Edit job
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => {
              handleDeleteJob(row.original.id)
            }}
          >
            Delete job
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-h-[95vh] overflow-y-auto">
        {isEdit ? (
          <EditJobForm row={row} handleSetOpenFn={handleSetOpen} />
        ) : (
          <ShowJobInfo row={row} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RowActions
