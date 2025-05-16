'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
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

export default function Home() {
  const [search, setSearch] = useState('')
  const [programs, setPrograms] = useState<Program[]>([])
  const [filtered, setFiltered] = useState<Program[]>([])
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        console.log('Fetching programs and bookmarks...')
        const [programsRes, bookmarksRes] = await Promise.all([
          fetch('/api/programs'),
          fetch('/api/bookmarks?userId=1')
        ])

        if (!programsRes.ok) {
          throw new Error(`Failed to fetch programs: ${programsRes.status}`)
        }
        if (!bookmarksRes.ok) {
          throw new Error(`Failed to fetch bookmarks: ${bookmarksRes.status}`)
        }

        const [programsData, bookmarksData] = await Promise.all([
          programsRes.json(),
          bookmarksRes.json()
        ])

        console.log('Programs data:', programsData)
        console.log('Bookmarks data:', bookmarksData)

        if (!Array.isArray(programsData)) {
          throw new Error('Invalid programs data format')
        }
        if (!Array.isArray(bookmarksData)) {
          throw new Error('Invalid bookmarks data format')
        }

        setPrograms(programsData)
        setFiltered(programsData)

        const bookmarkedIds = new Set<number>()
        bookmarksData.forEach((b: { program: { id: number } }) => bookmarkedIds.add(b.program.id))
        setBookmarkedPrograms(bookmarkedIds)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!search) {
      setFiltered(programs)
    } else {
      setFiltered(
        programs.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [search, programs])

  const handleBookmarkToggle = async (programId: number) => {
    try {
      const userId = 1 // TODO: Replace with actual user ID
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

      const data = await response.json()
      
      setBookmarkedPrograms(prev => {
        const newSet = new Set<number>()
        prev.forEach(id => newSet.add(id))
        if (data.message === 'Bookmark removed') {
          newSet.delete(programId)
        } else {
          newSet.add(programId)
        }
        return newSet
      })
    } catch (err) {
      console.error('Error toggling bookmark:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading programs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link href="/programs" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Browse Programs</h2>
          <p className="text-gray-600">Explore our collection of educational programs</p>
        </Link>
        <Link href="/bookmarks" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">My Bookmarks</h2>
          <p className="text-gray-600">View and manage your saved programs</p>
        </Link>
        <Link href="/signup" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
          <p className="text-gray-600">Create an account to bookmark and manage programs</p>
        </Link>
      </div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Program Finder</h1>
        <p className="text-xl text-gray-600 mb-6">Find and manage educational programs with ease</p>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for programs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field max-w-md"
          />
        </div>
      </header>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {search ? 'Search Results' : 'Featured Programs'}
        </h2>
        {filtered.length === 0 ? (
          <div className="text-gray-500">No programs found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                isBookmarked={bookmarkedPrograms.has(program.id)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 