import { type JobColumns } from '@/types/types'
import FileSaver from 'file-saver'
import Papa from 'papaparse'

/**
 * Downloads the jobs data as either CSV or JSON format.
 *
 * @param {JobColumns[]} dataToSave - The data to be saved.
 * @param {boolean} isCSV - A flag indicating whether to save the data as CSV or JSON.
 * @return {void} This function does not return a value.
 */
export const downloadJobsData = (
  dataToSave: JobColumns[],
  isCSV: boolean,
): void => {
  let data

  if (isCSV) {
    // @ts-expect-error the data passed as a parameter is a valid type
    const blob = new Blob([Papa.unparse(JSON.stringify(dataToSave))], {
      type: 'text/csv',
    })

    data = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', data)
    link.setAttribute('download', `jobs.${isCSV ? 'csv' : 'json'}`)
    link.click()
  } else {
    const file = new File([JSON.stringify(dataToSave)], 'jobs.json', {
      type: 'data:text/json;charset=utf-8',
    })
    FileSaver.saveAs(file)
  }
}
