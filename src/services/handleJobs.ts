import { v4 as uuidv4 } from 'uuid'
import type { JobColumns } from '@/types/types'
import {
  addJobInDB,
  deleteJobInDB,
  getJobsFromDB,
  updateJobInDB,
} from '@/services/handleDbJobs'

/**
 * Retrieves jobs from local storage, initializes if not present.
 *
 * @return {JobColumns[] | []} Retrieved jobs or an empty array if not present
 */
const getJobsFromLocalStorage = (): JobColumns[] | [] => {
  const savedJobs = localStorage.getItem('jobs')

  if (savedJobs === null) {
    localStorage.setItem('jobs', JSON.stringify([]))
    return []
  }

  return JSON.parse(savedJobs)
}

/**
 * Retrieves all jobs from the database for a given user email, or from local storage if no email is provided.
 *
 * @param {null | string} userEmail - The email of the user to retrieve jobs for. If null or undefined, retrieves jobs from local storage.
 * @return {Promise<[] | JobColumns[]>} - A promise that resolves to an array of JobColumns objects representing the retrieved jobs, or an empty array if no jobs are found.
 * @throws {Error} - If an error occurs while retrieving jobs from the database.
 */
export const getAllJobs = async (
  userEmail?: null | string,
): Promise<[] | JobColumns[]> => {
  if (userEmail === null || userEmail === undefined) {
    const JobsInStorage = getJobsFromLocalStorage()

    return JobsInStorage
  }

  try {
    const res = await getJobsFromDB(userEmail)

    return res
  } catch (err) {
    console.error(err)
    throw new Error('Something went wrong, please try again later')
  }
}

/**
 * Add a new job to either local storage or the database, and return the added job.
 *
 * @param {JobColumns | Omit<JobColumns, 'id' | 'date'>} newJob - The job to be added, with or without 'id' and 'date' fields.
 * @param {null | string} userEmail - The email of the user adding the job, if available.
 * @return {Promise<JobColumns>} The added job, with 'id' and 'date' fields filled in, if added successfully.
 */
export const addNewJob = async (
  newJob: JobColumns | Omit<JobColumns, 'id' | 'date'>,
  userEmail?: null | string,
): Promise<JobColumns> => {
  const newJobWithID = {
    ...newJob,
    id: uuidv4(),
    date: Date.now().toString(),
    userEmail: userEmail ?? '',
  }

  if (userEmail === null || userEmail === undefined) {
    const savedJobs = getJobsFromLocalStorage()

    const jobsWithNewJob = [...savedJobs, newJobWithID]

    localStorage.setItem('jobs', JSON.stringify(jobsWithNewJob))

    return newJobWithID
  }

  try {
    const res = await addJobInDB(newJobWithID)
    return res
  } catch (err) {
    console.error(err)
    throw new Error('Something went wrong, try again later')
  }
}

/**
 * Edit a job in local storage or the database.
 *
 * @param {JobColumns} editedJob - The job object to be edited
 * @param {null | string} userEmail - Optional user email
 * @return {Promise<JobColumns>} The edited job object
 */
export const editJob = async (
  editedJob: JobColumns,
  userEmail?: null | string,
): Promise<JobColumns> => {
  if (userEmail === null || userEmail === undefined) {
    const savedJobs = getJobsFromLocalStorage()

    const jobsWithEditedJob = savedJobs.map(job => {
      if (job.id === editedJob.id) {
        return editedJob
      }

      return job
    })

    localStorage.setItem('jobs', JSON.stringify(jobsWithEditedJob))

    return editedJob
  }

  try {
    const res = await updateJobInDB(editedJob)
    return res
  } catch (err) {
    console.error(err)
    throw new Error('Something went wrong, try again later')
  }
}

/**
 * Deletes a job either from the local storage or the database.
 *
 * @param {string} id - The ID of the job to be deleted.
 * @param {null | string} [userEmail] - Optional user email associated with the job.
 * @return {Promise<string>} The ID of the deleted job.
 */
export const deleteJob = async (
  id: string,
  userEmail?: null | string,
): Promise<string> => {
  if (userEmail === null || userEmail === undefined) {
    const savedJobs = getJobsFromLocalStorage()

    const jobsWithoutDeletedJob = savedJobs.filter(job => job.id !== id)

    localStorage.setItem('jobs', JSON.stringify(jobsWithoutDeletedJob))

    return id
  }

  try {
    const res = await deleteJobInDB(id)
    return res
  } catch (err) {
    console.error(err)
    throw new Error('Something went wrong, try again later')
  }
}
