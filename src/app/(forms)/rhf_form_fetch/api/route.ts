import { type NextRequest, NextResponse } from 'next/server'
import { setTimeout } from 'node:timers/promises'
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  await setTimeout(1000)
  return NextResponse.json(Object.fromEntries(formData.entries()))
}
