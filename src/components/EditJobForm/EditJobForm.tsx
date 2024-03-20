'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { JobsContext } from '@/context/JobContext'
import { Button } from '../ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Separator } from '@radix-ui/react-dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { type Row } from '@tanstack/react-table'
import { type JobColumns } from '@/types/types'
const formSchema = z.object({
  status: z.enum(['send later', 'sent', 'rejected', 'accepted', 'expired']),
  position: z.string(),
  positionLink: z.string(),
  company: z.string(),
  description: z.string(),
  requirements: z.string(),
  extra: z.string().optional(),
  cv: z.string().optional(),
  letter: z.string().optional(),
})

const EditJobForm = ({
  row,
  handleSetOpenFn,
}: {
  row: Row<JobColumns>
  handleSetOpenFn: () => void
}): React.ReactElement => {
  const { handleEditJob } = useContext(JobsContext)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: row.original.status,
      position: row.original.position,
      positionLink: row.original.positionLink,
      company: row.original.company,
      description: row.original.description,
      requirements: row.original.requirements,
      extra: String(row.original.extra),
      cv: String(row.original.cv),
      letter: String(row.original.letter),
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    form.reset()
    void handleEditJob({ ...row.original, ...values })
    handleSetOpenFn()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={e => {
          e.preventDefault()
          void form.handleSubmit(onSubmit)(e)
        }}
        className="space-y-8"
      >
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required placeholder="Position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="positionLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required placeholder="Position url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required placeholder="Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="send later">Send later</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    required
                    placeholder="Job description"
                    rows={7}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    required
                    placeholder="Job requirements"
                    rows={7}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extra"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Job extras" rows={7} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cv"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="CV url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name="letter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Cover letter url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <DialogFooter>
          <div className="flex gap-4">
            <DialogClose asChild>
              <Button variant="destructive" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default EditJobForm
