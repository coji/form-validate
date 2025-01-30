'use server'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from './schema'

export async function createPost(previousState: boolean, formData: FormData) {
  const { title } = formSchema.parse(formData)
  console.log({ title })
  await setTimeout(1000)
  return true
}
