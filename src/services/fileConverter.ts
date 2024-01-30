import { type JobColumns } from '@/types/types'
import Papa from 'papaparse'

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
  } else {
    const json = 'data:text/json;charset=utf-8,' + JSON.stringify(dataToSave)

    data = encodeURI(json)
  }

  const link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', `jobs.${isCSV ? 'csv' : 'json'}`)
  link.click()
}
