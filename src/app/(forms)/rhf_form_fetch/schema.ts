import { z } from 'zod'

export const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, "Email can't be empty")
    .max(100, 'Email is too long'),
})

export type FormSchema = z.infer<typeof formSchema>
