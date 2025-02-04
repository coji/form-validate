'use server'
import { parseWithZod } from '@conform-to/zod'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from './schema'

export async function createPost(previousState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: formSchema })
  if (submission.status !== 'success') {
    console.log(submission.reply())
    return { lastResult: submission.reply(), value: null }
  }
  await setTimeout(1000)
  return { lastResult: submission.reply(), value: submission.value }
}
