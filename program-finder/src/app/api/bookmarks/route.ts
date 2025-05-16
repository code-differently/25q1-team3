import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        program: {
          include: {
            university: true,
            requirements: true,
          },
        },
      },
    })

    return NextResponse.json(bookmarks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { programId, userId } = body

    if (!programId || !userId) {
      return NextResponse.json(
        { error: 'Program ID and User ID are required' },
        { status: 400 }
      )
    }

    // Check if bookmark already exists
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_programId: {
          userId: parseInt(userId),
          programId: parseInt(programId),
        },
      },
    })

    if (existingBookmark) {
      // Remove bookmark if it exists
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      })
      return NextResponse.json({ message: 'Bookmark removed' })
    }

    // Create new bookmark
    const bookmark = await prisma.bookmark.create({
      data: {
        userId: parseInt(userId),
        programId: parseInt(programId),
      },
      include: {
        program: {
          include: {
            university: true,
            requirements: true,
          },
        },
      },
    })

    return NextResponse.json(bookmark)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to toggle bookmark' },
      { status: 500 }
    )
  }
} 