import { z } from 'zod'

export const formSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
})

export type FormSchema = z.infer<typeof formSchema>
