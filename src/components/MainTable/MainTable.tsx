'use client'

import { useContext } from 'react'
import { columns } from '../../components/TableComponents/columns'
import DataTable from '../../components/TableComponents/data-table'
import { JobsContext } from '@/context/JobContext'

const MainTable = (): React.ReactElement => {
  const { jobs } = useContext(JobsContext)

  return (
    <div className="mx-auto px-2 py-4 md:container md:py-10">
      <DataTable columns={columns} data={jobs} />
    </div>
  )
}

export default MainTable
