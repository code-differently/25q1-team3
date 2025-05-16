'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface UserProfile {
  id: number
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const params = useParams()
  const userId = params?.id as string
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    fetch(`/api/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
          setProfile(null)
        } else {
          setProfile(data)
          setName(data.name || '')
        }
      })
      .catch(() => setError('Failed to fetch user profile'))
      .finally(() => setLoading(false))
  }, [userId])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to update profile')
      } else {
        setProfile(data)
        setSuccess('Profile updated!')
      }
    } catch {
      setError('Failed to update profile')
    }
  }

  if (loading) return <div className="container mx-auto py-8 text-center">Loading profile...</div>
  if (error) return <div className="container mx-auto py-8 text-center text-red-600">{error}</div>
  if (!profile) return null

  return (
    <div className="container mx-auto max-w-lg py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input type="text" value={profile.email} disabled className="input-field w-full bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field w-full" />
        </div>
        <button type="submit" className="btn btn-primary w-full">Update Profile</button>
        {success && <div className="text-green-600 text-center">{success}</div>}
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
      <div className="mt-6 text-sm text-gray-500 text-center">
        <div>User ID: {profile.id}</div>
        <div>Created: {new Date(profile.createdAt).toLocaleString()}</div>
        <div>Updated: {new Date(profile.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  )
} 