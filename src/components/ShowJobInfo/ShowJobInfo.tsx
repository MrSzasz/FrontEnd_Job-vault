import { type Row } from '@tanstack/react-table'
import { type JobColumns } from '@/types/types'
import { Button } from '../ui/button'
import { statusColors } from '@/services/statusColors'
import { capitalizeFirst } from '@/services/functions'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { ExternalLink } from 'lucide-react'

const ShowJobInfo = ({ row }: { row: Row<JobColumns> }): React.ReactElement => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-start">
          <a
            href={row.original.positionLink}
            target="_blank"
            className="flex w-fit items-center gap-2 border-b-2 border-transparent transition-all hover:border-white"
            rel="noreferrer"
          >
            {row.original.position} <ExternalLink size=".75em" />
          </a>
          <small className="text-xs text-gray-500">
            {capitalizeFirst(row.original.company)} |{' '}
            <span className={statusColors[row.original.status]}>
              {capitalizeFirst(row.original.status)}
            </span>
          </small>
        </DialogTitle>
        <Separator />
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-md text-md font-semibold text-white">
            Description:
          </h2>
          <p className="text-sm">{row.original.description}</p>
        </div>
        <div>
          <h2 className="text-md text-md font-semibold text-white">
            Requirements:
          </h2>
          <p className="text-sm">{row.original.requirements}</p>
        </div>
        {row.original.extra !== null &&
        row.original.extra !== '' &&
        row.original.extra !== undefined ? (
          <div>
            <h2 className="text-md text-md font-semibold text-white">Extra:</h2>
            <p className="text-sm">{row.original.extra}</p>
          </div>
        ) : null}
      </div>
      <DialogFooter>
        <div className="flex gap-4">
          {row.original.cv !== null &&
          row.original.cv !== '' &&
          row.original.cv !== undefined ? (
            <Button>Show CV</Button>
          ) : null}
          {row.original.letter !== null &&
          row.original.letter !== '' &&
          row.original.letter !== undefined ? (
            <Button>Show Cover Letter</Button>
          ) : null}
        </div>
      </DialogFooter>
    </>
  )
}

export default ShowJobInfo
