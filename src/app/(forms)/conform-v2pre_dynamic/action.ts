'use server'
import { parseSubmission, report } from 'conform-react'
import { resolveZodResult } from 'conform-zod'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from './schema'

export async function createPost(previousState: unknown, formData: FormData) {
  const submission = parseSubmission(formData)
  const result = formSchema.safeParse(submission.value)

  if (!result.success) {
    return {
      lastResult: report(submission, {
        error: resolveZodResult(result),
      }),
      value: null,
    }
  }

  await setTimeout(1000)
  // do something with the valid form data

  return {
    lastResult: report(submission, {
      error: resolveZodResult(result),
      reset: true,
    }),
    value: result.data,
  }
}
