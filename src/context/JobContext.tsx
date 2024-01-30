'use client'

import {
  addNewJob,
  deleteJob,
  editJob,
  getAllJobsInLocalStorage,
} from '@/services/handleJobs'
import type { JobColumns } from '@/types/types'
import { createContext, useEffect, useState } from 'react'
import Papa from 'papaparse'

interface JobsContextType {
  isLoading: boolean
  jobs: JobColumns[]
  handleAddJobsFromFile: (jobsFromFile: File) => void
  handleAddJob: (jobToAdd: JobColumns | Omit<JobColumns, 'id' | 'date'>) => void
  handleEditJob: (jobForEdit: JobColumns) => void
  handleDeleteJob: (jobId: string) => void
}

export const JobsContext = createContext<JobsContextType>({
  isLoading: true,
  jobs: [],
  handleAddJobsFromFile: () => {},
  handleAddJob: () => {},
  handleDeleteJob: () => {},
  handleEditJob: () => {},
})

const JobsProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [jobs, setJobs] = useState<JobColumns[] | []>([])

  const handleAddJobsFromFile = (jobsFromFile: File): void => {
    // eslint-disable-next-line
    let fileReader: FileReader

    const handleFileRead = (): void => {
      const content = fileReader.result

      if (jobsFromFile.type === 'text/csv') {
        if (content !== null) {
          // @ts-expect-error "content" is a valid type for this function
          Papa.parse(content, {
            header: true,
            complete(results) {
              setJobs(results.data as JobColumns[])
              localStorage.setItem('jobs', JSON.stringify(results.data))
            },
          })
        }
      } else {
        setJobs(JSON.parse(content as string) as JobColumns[])
        localStorage.setItem('jobs', content as string)
      }
    }

    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(jobsFromFile)
  }

  const handleAddJob = (
    jobToAdd: JobColumns | Omit<JobColumns, 'id' | 'date'>,
  ): void => {
    const newJobArray = addNewJob(jobToAdd)
    setJobs(newJobArray)
  }

  const handleEditJob = (jobForEdit: JobColumns): void => {
    const editedJobArray = editJob(jobForEdit)
    setJobs(editedJobArray)
  }

  const handleDeleteJob = (jobId: string): void => {
    const deletedJobArray = deleteJob(jobId)
    setJobs(deletedJobArray)
  }

  useEffect(() => {
    const savedJobs = getAllJobsInLocalStorage()
    setJobs(savedJobs)
    setIsLoading(false)
  }, [])

  return (
    <JobsContext.Provider
      value={{
        isLoading,
        jobs,
        handleAddJobsFromFile,
        handleAddJob,
        handleEditJob,
        handleDeleteJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  )
}

export default JobsProvider
