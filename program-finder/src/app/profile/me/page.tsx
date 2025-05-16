import { useEffect, useState } from 'react'

interface UserProfile {
  id: number
  email: string
  name: string | null
  password: string
  createdAt: string
  updatedAt: string
}

export default function MyProfilePage() {
  const userId = 1 // TODO: Replace with real user ID from authentication
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
          setProfile(null)
        } else {
          setProfile(data)
          setForm({ name: data.name || '', email: data.email, password: '' })
        }
      })
      .catch(() => setError('Failed to fetch profile'))
      .finally(() => setLoading(false))
  }, [userId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container mx-auto py-8 text-center">Loading profile...</div>
  if (error) return <div className="container mx-auto py-8 text-center text-red-600">{error}</div>
  if (!profile) return null

  return (
    <div className="container mx-auto max-w-lg py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field w-full" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field w-full" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="input-field w-full" placeholder="Leave blank to keep current password" />
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