import type { JobColumns } from '@/types/types'
import axios from 'axios'
const url = 'http://localhost:5000/api'

export const getJobsFromDB = async (
  email: string,
): Promise<JobColumns[] | []> => {
  const res = await axios.get(url, {
    params: {
      email,
    },
  })

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again later')
  }

  return res.data.data
}

export const addJobInDB = async (
  newJobToSave: JobColumns,
): Promise<JobColumns> => {
  const res = await axios.post(url, { job: newJobToSave })

  if (res.status !== 200) {
    throw new Error('Something went wrong saving job, try again later')
  }

  return newJobToSave
}

export const updateJobInDB = async (
  newJobToSave: JobColumns,
): Promise<JobColumns> => {
  const res = await axios.put(url, { job: newJobToSave })

  if (res.status !== 200) {
    throw new Error('Something went wrong updating job, try again later')
  }

  return newJobToSave
}

export const deleteJobInDB = async (jobId: string): Promise<string> => {
  const res = await axios.delete(url, {
    params: {
      jobId,
    },
  })

  if (res.status !== 200) {
    throw new Error('Something went wrong deleting job, try again later')
  }

  return jobId
}
