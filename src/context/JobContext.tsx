'use client'

import {
  addNewJob,
  deleteJob,
  editJob,
  getAllJobs,
} from '@/services/handleJobs'
import type { JobColumns } from '@/types/types'
import { createContext, useEffect, useState } from 'react'
import Papa from 'papaparse'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

interface JobsContextType {
  isLoading: boolean
  jobs: JobColumns[]
  handleAddJobsFromFile: (jobsFromFile: File) => void
  handleAddJob: (
    jobToAdd: JobColumns | Omit<JobColumns, 'id' | 'date'>,
  ) => Promise<void>
  handleEditJob: (jobForEdit: JobColumns) => Promise<void>
  handleDeleteJob: (jobId: string) => Promise<void>
}

export const JobsContext = createContext<JobsContextType>({
  isLoading: true,
  jobs: [],
  handleAddJobsFromFile: () => {},
  handleAddJob: async () => {},
  handleDeleteJob: async () => {},
  handleEditJob: async () => {},
})

const JobsProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
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

  const handleAddJob = async (
    jobToAdd: JobColumns | Omit<JobColumns, 'id' | 'date'>,
  ): Promise<void> => {
    toast({
      description: 'Saving job...',
      duration: 10000,
    })

    try {
      const newJob = await addNewJob(jobToAdd, session?.user?.email)

      setJobs([...jobs, newJob])
      toast({
        description: 'Job saved!',
        duration: 3500,
      })
    } catch (err) {
      console.error(err)
      toast({
        description: 'Something went wrong, try again later',
        duration: 3500,
        variant: 'destructive',
      })
    }
  }

  const handleEditJob = async (jobForEdit: JobColumns): Promise<void> => {
    toast({
      description: 'Saving job...',
      duration: 10000,
    })

    try {
      const editedJob = await editJob(jobForEdit, session?.user?.email)
      const jobArrayWithEditedJob = jobs.map(job => {
        if (job.id === editedJob.id) {
          return editedJob
        }

        return job
      })

      setJobs(jobArrayWithEditedJob)

      toast({
        description: 'Job saved!',
        duration: 3500,
      })
    } catch (err) {
      console.error(err)
      toast({
        description: 'Something went wrong, try again later',
        duration: 3500,
        variant: 'destructive',
      })
    }
  }

  const handleDeleteJob = async (jobId: string): Promise<void> => {
    toast({
      description: 'Deleting job...',
      duration: 10000,
    })

    try {
      const deletedJobId = await deleteJob(jobId, session?.user?.email)
      const jobsWithoutDeletedJob = jobs.filter(job => job.id !== deletedJobId)
      setJobs(jobsWithoutDeletedJob)

      toast({
        description: 'Job deleted!',
        duration: 3500,
      })
    } catch (error) {
      console.error(error)
      toast({
        description: 'Something went wrong, try again later',
        duration: 3500,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    toast({
      description: 'Getting jobs from database...',
      duration: 10000,
    })
    if (status !== 'loading') {
      void (async () => {
        try {
          const savedJobs = await getAllJobs(session?.user?.email)
          setJobs(savedJobs)
          setIsLoading(false)
          toast({
            description: 'Done!',
            duration: 1500,
          })
        } catch (err) {
          console.error(err)
          toast({
            description: 'Something went wrong, try again later',
            duration: 3500,
            variant: 'destructive',
          })
        }
      })()
    }
  }, [status])

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
