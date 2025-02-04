import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email(),
})

export type FormSchema = z.infer<typeof formSchema>
