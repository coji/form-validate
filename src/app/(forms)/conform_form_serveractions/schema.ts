import { z } from 'zod'

export const formSchema = z.object({
  email: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>
