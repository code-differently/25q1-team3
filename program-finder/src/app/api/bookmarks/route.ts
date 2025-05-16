import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    console.log('[BOOKMARKS][GET] Incoming request:', request.url)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    console.log('[BOOKMARKS][GET] userId:', userId)

    if (!userId) {
      console.log('[BOOKMARKS][GET] Missing userId')
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
    console.log('[BOOKMARKS][GET] Found bookmarks:', bookmarks.length)
    return NextResponse.json(bookmarks)
  } catch (error) {
    console.error('[BOOKMARKS][GET] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log('[BOOKMARKS][POST] Incoming request')
    const body = await request.json()
    const { programId, userId } = body
    console.log('[BOOKMARKS][POST] programId:', programId, 'userId:', userId)

    if (!programId || !userId) {
      console.log('[BOOKMARKS][POST] Missing programId or userId')
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
    console.log('[BOOKMARKS][POST] Existing bookmark:', existingBookmark)

    if (existingBookmark) {
      // Remove bookmark if it exists
      console.log('[BOOKMARKS][POST] Removing existing bookmark')
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      })
      return NextResponse.json({ message: 'Bookmark removed' })
    }

    // Create new bookmark
    console.log('[BOOKMARKS][POST] Creating new bookmark')
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
    console.error('[BOOKMARKS][POST] Error:', error)
    return NextResponse.json(
      { error: 'Failed to toggle bookmark', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 