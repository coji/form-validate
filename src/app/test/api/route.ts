import { type NextRequest, NextResponse } from 'next/server'

// Sample in-memory data store (replace with a real database in production)
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

// GET method to retrieve users
export async function GET(request: NextRequest) {
  // Optional: Handle query parameters
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit')

  // If limit is provided, slice the users array
  const filteredUsers = limit ? users.slice(0, Number(limit)) : users

  return NextResponse.json(filteredUsers)
}

// POST method to create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      )
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

// Optional: Error handling for unsupported methods
export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
