'use server'

import { db } from '@/db/db'
import { jobs } from '@/db/schema'
import type { JobColumns } from '@/types/types'
import { desc, eq } from 'drizzle-orm'

/**
 * Retrieves jobs from the database based on the provided email.
 *
 * @param {string} email - The email of the user.
 * @return {Promise<JobColumns[] | []>} - A promise that resolves to an array of JobColumns or an empty array.
 */
export const getJobsFromDB = async (
  email: string,
): Promise<JobColumns[] | []> => {
  const jobsInTurso = await db
    .select()
    .from(jobs)
    .where(eq(jobs.userEmail, email))
    .orderBy(desc(jobs.date))

  return jobsInTurso as JobColumns[] | []
}

/**
 * Adds a new job to the database.
 *
 * @param {JobColumns} newJobToSave - The job data to be saved
 * @return {Promise<JobColumns>} The newly created job
 */
export const addJobInDB = async (
  newJobToSave: JobColumns,
): Promise<JobColumns> => {
  const createdJob = await db
    .insert(jobs)
    // @ts-expect-error "values" is a valid type for this function
    .values(newJobToSave)
    .onConflictDoNothing()
    .returning()
  if (createdJob.length === 0) {
    throw new Error('Error saving job, try again later')
  }

  return createdJob[0] as JobColumns
}

/**
 * Updates a job in the database with the given new job data.
 *
 * @param {JobColumns} newJobToSave - The new job data to be saved.
 * @return {Promise<JobColumns>} - A promise that resolves to the updated job.
 */
export const updateJobInDB = async (
  newJobToSave: JobColumns,
): Promise<JobColumns> => {
  const res = await db
    .update(jobs)
    // @ts-expect-error "values" is a valid type for this function
    .set(newJobToSave)
    .where(eq(jobs.id, newJobToSave.id))
    .returning()

  return res[0] as JobColumns
}

/**
 * Deletes a job from the database.
 *
 * @param {string} jobId - The ID of the job to be deleted
 * @return {Promise<JobColumns>} The deleted job object
 */
export const deleteJobInDB = async (jobId: string): Promise<JobColumns> => {
  const res = await db.delete(jobs).where(eq(jobs.id, jobId)).returning()

  return res[0] as JobColumns
}
