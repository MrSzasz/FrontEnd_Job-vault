import type { JobColumns } from '@/types/types'
import axios from 'axios'

/**
 * Retrieves jobs from the database based on the provided email.
 *
 * @param {string} email - The email of the user.
 * @return {Promise<JobColumns[] | []>} - A promise that resolves to an array of JobColumns or an empty array.
 */
export const getJobsFromDB = async (
  email: string,
): Promise<JobColumns[] | []> => {
  if (typeof process.env.NEXT_PUBLIC_BACKEND_URL !== 'string') {
    throw new Error('Wrong url provided, please contact support')
  }
  const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL, {
    params: {
      email,
    },
  })

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again later')
  }

  return res.data.data
}

/**
 * Adds a new job to the database.
 *
 * @param {JobColumns} newJobToSave - The job data to be saved.
 * @return {Promise<JobColumns>} - A promise that resolves to the newly created job.
 */
export const addJobInDB = async (
  newJobToSave: JobColumns,
): Promise<JobColumns> => {
  if (typeof process.env.NEXT_PUBLIC_BACKEND_URL !== 'string') {
    throw new Error('Wrong url provided, please contact support')
  }

  const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL, {
    job: newJobToSave,
  })

  if (res.status !== 200) {
    throw new Error('Something went wrong saving job, try again later')
  }

  return newJobToSave
}

/**
 * Updates a job in the database with the given new job data.
 *
 * @param {JobColumns} newJobToSave - The new job data to be saved.
 * @return {Promise<JobColumns>} - A promise that resolves to the updated job.
 * @throws {Error} - If there is an error updating the job, with the message 'Something went wrong updating job, try again later'.
 */
export const updateJobInDB = async (
  newJobToSave: JobColumns,
): Promise<JobColumns> => {
  if (typeof process.env.NEXT_PUBLIC_BACKEND_URL !== 'string') {
    throw new Error('Wrong url provided, please contact support')
  }

  const res = await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL, {
    job: newJobToSave,
  })

  if (res.status !== 200) {
    throw new Error('Something went wrong updating job, try again later')
  }

  return newJobToSave
}

/**
 * Deletes a job from the database.
 *
 * @param {string} jobId - The ID of the job to be deleted.
 * @return {Promise<string>} The ID of the deleted job.
 */
export const deleteJobInDB = async (jobId: string): Promise<string> => {
  if (typeof process.env.NEXT_PUBLIC_BACKEND_URL !== 'string') {
    throw new Error('Wrong url provided, please contact support')
  }

  const res = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL, {
    params: {
      jobId,
    },
  })

  if (res.status !== 200) {
    throw new Error('Something went wrong deleting job, try again later')
  }

  return jobId
}
