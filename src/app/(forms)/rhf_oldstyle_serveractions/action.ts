'use server'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from './schema'

export async function createPost(previousState: unknown, formData: FormData) {
  const { email } = formSchema.parse({ email: formData.get('email') })
  await setTimeout(1000)
  return { email }
}
