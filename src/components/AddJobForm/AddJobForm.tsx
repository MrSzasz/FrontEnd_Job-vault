'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

import { JobsContext } from '@/context/JobContext'
import { useContext, useState } from 'react'
import AddNewJobForm from '../AddNewJobForm/AddNewJobForm'
import DragAndDropFile from '../DragAndDropFile/DragAndDropFile'

const AddJobForm = (): React.ReactElement => {
  const [file, setFile] = useState<File | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [loadingDataFromFile, setLoadingDataFromFile] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const { isLoading, handleAddJobsFromFile } = useContext(JobsContext)

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
    if (e.dataTransfer !== null) {
      const fileFromDrop = e.dataTransfer.files[0]
      setFile(fileFromDrop)
    }
  }

  const handleDragEnter = (): void => {
    setIsDragActive(true)
  }

  const handleDragLeave = (): void => {
    setIsDragActive(false)
  }

  const handleDropZoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (e.target.files !== null) {
      const fileFromInput = e.target.files[0]

      setFile(fileFromInput)
    }
  }

  const handleAddJobs = (): void => {
    if (file !== null) handleAddJobsFromFile(file)
    setFile(null)
  }

  const handleSubmitAndClose = (): void => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-4">
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setLoadingDataFromFile(true)
            }}
            disabled={isLoading}
          >
            Load data from file
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setLoadingDataFromFile(false)
            }}
            disabled={isLoading}
          >
            Add job
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        {!loadingDataFromFile ? (
          <AddNewJobForm handleSubmitAndCloseFn={handleSubmitAndClose} />
        ) : (
          <DragAndDropFile
            handleDropFn={handleDrop}
            handleDragEnterFn={handleDragEnter}
            handleDragLeaveFn={handleDragLeave}
            isDragActive={isDragActive}
            file={file}
            handleDropZoneChangeFn={handleDropZoneChange}
            handleAddJobsFn={handleAddJobs}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddJobForm
