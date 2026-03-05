'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminContextType {
  isAdmin: boolean
  setIsAdmin: (v: boolean) => void
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
})

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.isAdmin))
      .catch(() => {})
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
