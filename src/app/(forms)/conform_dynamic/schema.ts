import { z } from 'zod'

export const formSchema = z.discriminatedUnion('option', [
  z.object({
    email: z.string(),
    option: z.literal('on'),
    memo: z.string(),
  }),
  z.object({
    email: z.string(),
    option: z.literal(undefined),
  }),
])

export type FormSchema = z.infer<typeof formSchema>
