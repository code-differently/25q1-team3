import { useState } from 'react'
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid'

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

interface ProgramCardProps {
  program: Program
  isBookmarked?: boolean
  onBookmarkToggle?: (programId: number) => void
}

export default function ProgramCard({ program, isBookmarked = false, onBookmarkToggle }: ProgramCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="card hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{program.name}</h3>
          <p className="text-gray-600">{program.university.name}</p>
          <p className="text-sm text-gray-500">{program.university.location}</p>
        </div>
        {onBookmarkToggle && (
          <button
            onClick={() => onBookmarkToggle(program.id)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isBookmarked ? (
              <BookmarkSolid className="h-6 w-6 text-blue-600" />
            ) : (
              <BookmarkOutline className="h-6 w-6 text-gray-400" />
            )}
          </button>
        )}
      </div>
      
      <p className="text-gray-700 mb-4">{program.description}</p>
      
      {program.requirements.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Requirements:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {program.requirements.map((req, index) => (
              <li key={index}>{req.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 