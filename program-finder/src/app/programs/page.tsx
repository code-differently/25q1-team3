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

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs')
        if (!response.ok) {
          throw new Error('Failed to fetch programs')
        }
        const data = await response.json()
        setPrograms(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const handleBookmarkToggle = async (programId: number) => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ programId }),
      })

      if (!response.ok) {
        throw new Error('Failed to toggle bookmark')
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading programs...</div>
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
      <h1 className="text-3xl font-bold mb-8">Available Programs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onBookmarkToggle={handleBookmarkToggle}
          />
        ))}
      </div>
    </div>
  )
} 