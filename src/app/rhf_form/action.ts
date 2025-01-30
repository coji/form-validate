'use server'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from './schema'

export async function createPost(previousState: boolean, formData: FormData) {
  const { name } = formSchema.parse({
    name: formData.get('title'),
  })

  console.log({ name })
  await setTimeout(1000)

  return true
}
