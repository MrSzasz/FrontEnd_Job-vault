import { FileCheck2, UploadCloud } from 'lucide-react'
import { DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'

const DragAndDropFile = ({
  handleDropFn,
  handleDragEnterFn,
  handleDragLeaveFn,
  isDragActive,
  file,
  handleDropZoneChangeFn,
  handleAddJobsFn,
}: {
  handleDropFn: (e: React.DragEvent<HTMLLabelElement>) => void
  handleDragEnterFn: () => void
  handleDragLeaveFn: (isDragActive: boolean) => void
  isDragActive: boolean
  file: File | null
  handleDropZoneChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddJobsFn: () => void
}): React.ReactElement => {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          onDragOver={e => {
            e.preventDefault()
          }}
          onDrop={e => {
            e.preventDefault()
            handleDropFn(e)
          }}
          onDragEnter={e => {
            e.preventDefault()
            handleDragEnterFn()
          }}
          onDragLeave={e => {
            e.preventDefault()
            handleDragLeaveFn(false)
          }}
          className={
            isDragActive
              ? 'flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-600'
              : 'dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          }
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {file === null ? (
              <>
                <UploadCloud className="text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JSON or CVS file
                </p>
              </>
            ) : (
              <>
                <FileCheck2 className="mb-2 text-gray-400" />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">The file is ready</span>{' '}
                </p>
                <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  click to upload jobs
                </p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".csv, .json"
            onChange={e => {
              handleDropZoneChangeFn(e)
            }}
          />
        </label>
      </div>
      <DialogClose asChild>
        <Button disabled={file === null} onClick={handleAddJobsFn}>
          Load jobs
        </Button>
      </DialogClose>
    </>
  )
}

export default DragAndDropFile
