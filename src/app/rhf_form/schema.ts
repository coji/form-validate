import { z } from 'zod'

export const formSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, "Name can't be empty"),
  email: z.string().email(),
})

export type FormSchema = z.infer<typeof formSchema>
