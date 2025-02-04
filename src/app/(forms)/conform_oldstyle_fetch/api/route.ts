import { type NextRequest, NextResponse } from 'next/server'
import { setTimeout } from 'node:timers/promises'
import { formSchema } from '../schema'

export async function POST(request: NextRequest) {
  const { email } = formSchema.parse(await request.json())
  await setTimeout(1000)
  return NextResponse.json({ email })
}
