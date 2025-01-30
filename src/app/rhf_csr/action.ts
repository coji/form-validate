'use server'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from './schema'

export async function createPost(previousState: unknown, formData: FormData) {
  console.log(Object.fromEntries(formData.entries()))
  const { name } = formSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  console.log({ name })
  await setTimeout(1000)

  return { message: 'Post created' }
}
