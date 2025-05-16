'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Program Finder
          </Link>

          <div className="flex space-x-4">
            <Link
              href="/programs"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/programs')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Programs
            </Link>
            <Link
              href="/bookmarks"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/bookmarks')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Bookmarks
            </Link>
            <Link
              href="/signup"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/signup')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 