'use client'
import Link from 'next/link'
import { useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState<Set<number>>(new Set())
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query: string) => {
    setSearch(query)
    setHasSearched(!!query)
    if (!query) {
      setPrograms([])
      setError(null)
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const programsRes = await fetch('/api/programs')
      if (!programsRes.ok) {
        throw new Error(`Failed to fetch programs: ${programsRes.status}`)
      }
      const programsData = await programsRes.json()
      if (!Array.isArray(programsData)) {
        throw new Error('Invalid programs data format')
      }
      // Filter client-side for search
      const filtered = programsData.filter((p: Program) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
      setPrograms(filtered)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookmarkToggle = async (programId: number) => {
    console.log('Toggling bookmark for program:', programId)
    try {
      const userId = 1 // TODO: Replace with actual user ID
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ programId, userId }),
      })
      console.log('API response status:', response.status)
      const data = await response.json()
      console.log('API response data:', data)
      if (!response.ok) {
        throw new Error('Failed to toggle bookmark')
      }
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
            onChange={e => handleSearch(e.target.value)}
            className="input-field max-w-md"
          />
        </div>
      </header>
      {isLoading && (
        <div className="text-center">Loading programs...</div>
      )}
      {error && (
        <div className="text-center text-red-600 mb-4">{error}</div>
      )}
      {hasSearched && !isLoading && !error && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          {programs.length === 0 ? (
            <div className="text-gray-500">No programs found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
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
      )}
    </div>
  )
} 