import { type NextRequest, NextResponse } from 'next/server'
import { setTimeout } from 'node:timers/promises'

export async function POST(request: NextRequest) {
  const data = await request.json()
  console.log({ data })
  await setTimeout(1000)
  return NextResponse.json(data)
}
