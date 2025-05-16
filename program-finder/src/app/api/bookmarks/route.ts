import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

    console.log('Fetching bookmarks for user:', userId)
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
      take: 50, // Limit the number of bookmarks returned
    })
    console.log(`Found ${bookmarks.length} bookmarks`)
    return NextResponse.json(bookmarks)
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks', details: error instanceof Error ? error.message : 'Unknown error' },
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

    console.log('Toggling bookmark:', { programId, userId })
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
      console.log('Removing existing bookmark')
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      })
      return NextResponse.json({ message: 'Bookmark removed' })
    }

    // Create new bookmark
    console.log('Creating new bookmark')
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
    console.log('Bookmark created:', bookmark)
    return NextResponse.json(bookmark)
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    return NextResponse.json(
      { error: 'Failed to toggle bookmark', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 