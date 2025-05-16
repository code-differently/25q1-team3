import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    console.log('Fetching programs...')
    const programs = await prisma.program.findMany({
      include: {
        university: true,
        requirements: true,
      },
      take: 50, // Limit the number of programs returned
    })
    console.log(`Found ${programs.length} programs`)
    return NextResponse.json(programs)
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating program:', body)
    const program = await prisma.program.create({
      data: body,
      include: {
        university: true,
        requirements: true,
      },
    })
    console.log('Program created:', program)
    return NextResponse.json(program)
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { error: 'Failed to create program', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 