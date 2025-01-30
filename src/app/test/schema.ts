import { z } from 'zod'

export const formSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, "Title can't be empty"),
})

export type FormSchema = z.infer<typeof formSchema>
