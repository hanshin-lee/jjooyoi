'use client'

import { useState } from 'react'
import { useAdmin } from '@/contexts/AdminContext'

export function AdminBar() {
  const { isAdmin, setIsAdmin } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setIsAdmin(true)
        setShowModal(false)
        setPassword('')
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid password')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setIsAdmin(false)
  }

  return (
    <>
      {/* Lock icon in footer — rendered as a portal-like inline element */}
      <button
        onClick={() => (isAdmin ? handleLogout() : setShowModal(true))}
        title={isAdmin ? 'Exit admin mode' : 'Admin login'}
        className="flex items-center gap-1.5 text-[#c8bfaf] hover:text-[#8b7355] transition-colors"
        aria-label={isAdmin ? 'Logout from admin' : 'Admin login'}
      >
        {isAdmin ? (
          <>
            <LockOpenIcon />
            <span className="font-sans text-xs tracking-widest uppercase">Admin</span>
          </>
        ) : (
          <LockIcon />
        )}
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c2c2c]/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); setPassword(''); setError('') } }}
        >
          <div className="bg-beige-50 border border-[#d4cfc8] rounded-sm shadow-lg p-10 w-full max-w-sm mx-4">
            <h2 className="font-serif text-2xl font-light text-[#2c2c2c] mb-1">Admin</h2>
            <p className="font-sans text-xs text-[#aaa098] tracking-wider mb-8">Enter your password to edit content.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="Password"
                autoFocus
                className="w-full bg-white border border-[#d4cfc8] focus:border-[#8b7355] outline-none px-4 py-3 font-sans text-sm text-[#2c2c2c] rounded-sm transition-colors"
              />
              {error && (
                <p className="font-sans text-xs text-red-500">{error}</p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || !password}
                  className="flex-1 bg-[#2c2c2c] text-beige-50 font-sans text-xs tracking-widest uppercase py-3 hover:bg-[#8b7355] transition-colors disabled:opacity-40 rounded-sm"
                >
                  {loading ? 'Verifying…' : 'Enter'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setPassword(''); setError('') }}
                  className="px-6 font-sans text-xs tracking-widest uppercase text-[#aaa098] hover:text-[#2c2c2c] transition-colors border border-[#d4cfc8] rounded-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function LockOpenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  )
}
