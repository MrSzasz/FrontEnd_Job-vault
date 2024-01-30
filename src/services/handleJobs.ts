import { v4 as uuidv4 } from 'uuid'
import type { JobColumns } from '@/types/types'

export const getAllJobsInLocalStorage = (): JobColumns[] | [] => {
  const JobsInStorage = localStorage.getItem('jobs')

  if (JobsInStorage === null) {
    localStorage.setItem('jobs', JSON.stringify([]))
    return []
  }

  return JSON.parse(JobsInStorage)
}

export const addNewJob = (
  newJob: JobColumns | Omit<JobColumns, 'id' | 'date'>,
): JobColumns[] => {
  const savedJobs = getAllJobsInLocalStorage()

  const jobsWithNewJob = [
    ...savedJobs,
    {
      ...newJob,
      id: uuidv4(),
      date: new Date().toLocaleDateString(),
    },
  ]

  localStorage.setItem('jobs', JSON.stringify(jobsWithNewJob))

  return jobsWithNewJob
}

export const editJob = (editedJob: JobColumns): JobColumns[] => {
  const savedJobs = getAllJobsInLocalStorage()

  const jobsWithEditedJob = savedJobs.map(job => {
    if (job.id === editedJob.id) {
      return editedJob
    }

    return job
  })

  localStorage.setItem('jobs', JSON.stringify(jobsWithEditedJob))

  return jobsWithEditedJob
}

export const deleteJob = (id: string): JobColumns[] => {
  const savedJobs = getAllJobsInLocalStorage()

  const jobsWithoutDeletedJob = savedJobs.filter(job => job.id !== id)

  localStorage.setItem('jobs', JSON.stringify(jobsWithoutDeletedJob))

  return jobsWithoutDeletedJob
}
