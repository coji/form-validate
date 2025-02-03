import { type NextRequest, NextResponse } from 'next/server'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from '../schema'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const { email } = formSchema.parse({ email: formData.get('email') })
  await setTimeout(1000)
  return NextResponse.json({ email })
}
