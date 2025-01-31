import { z } from 'zod'

export const formSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, "Name can't be empty")
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email()
    .min(1, "Email can't be empty")
    .max(100, 'Email is too long'),
})

export type FormSchema = z.infer<typeof formSchema>
