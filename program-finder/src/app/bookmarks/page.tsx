'use client'

import { useEffect, useState } from 'react'
import ProgramCard from '@/components/ProgramCard'

interface Program {
  id: number
  name: string
  description: string
  university: {
    name: string
    location: string
  }
  requirements: {
    description: string
  }[]
}

interface Bookmark {
  id: number
  program: Program
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // TODO: Replace with actual user ID from authentication
  const userId = 1

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`/api/bookmarks?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks')
        }
        const data = await response.json()
        setBookmarks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [userId])

  const handleBookmarkToggle = async (programId: number) => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ programId, userId }),
      })

      if (!response.ok) {
        throw new Error('Failed to toggle bookmark')
      }

      // Remove the bookmark from the list
      setBookmarks(bookmarks.filter(b => b.program.id !== programId))
    } catch (err) {
      console.error('Error toggling bookmark:', err)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading bookmarks...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center text-gray-600">
          You haven't bookmarked any programs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <ProgramCard
              key={bookmark.id}
              program={bookmark.program}
              isBookmarked={true}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
} 