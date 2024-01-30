'use client'

import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { DialogClose, DialogFooter } from '../ui/dialog'

import { Input } from '@/components/ui/input'
import { JobsContext } from '@/context/JobContext'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useContext } from 'react'
import { Textarea } from '../ui/textarea'

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

const AddNewJobForm = ({
  handleSubmitAndCloseFn,
}: {
  handleSubmitAndCloseFn: () => void
}): React.ReactElement => {
  const { handleAddJob } = useContext(JobsContext)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 'sent',
      position: '',
      positionLink: '',
      company: '',
      description: '',
      requirements: '',
      extra: '',
      cv: '',
      letter: '',
    },
  })
  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    form.reset()
    handleAddJob(values)

    handleSubmitAndCloseFn()
  }

  return (
    <>
      <h2>Add new job</h2>
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
                    <Textarea placeholder="Job extras" {...field} />
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
    </>
  )
}

export default AddNewJobForm
