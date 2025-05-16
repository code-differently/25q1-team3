import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: {
        university: true,
        requirements: true,
      },
    })
    return NextResponse.json(programs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const program = await prisma.program.create({
      data: body,
      include: {
        university: true,
        requirements: true,
      },
    })
    return NextResponse.json(program)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
} 