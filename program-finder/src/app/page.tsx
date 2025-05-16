import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Program Finder</h1>
        <p className="text-xl text-gray-600">Find and manage educational programs with ease</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/programs" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Browse Programs</h2>
          <p className="text-gray-600">Explore our collection of educational programs</p>
        </Link>

        <Link href="/bookmarks" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">My Bookmarks</h2>
          <p className="text-gray-600">View and manage your saved programs</p>
        </Link>

        <Link href="/profile" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
          <p className="text-gray-600">Manage your account and preferences</p>
        </Link>
      </div>
    </div>
  )
} 