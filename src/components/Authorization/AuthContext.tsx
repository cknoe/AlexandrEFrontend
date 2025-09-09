import React, { createContext, useContext, useState, useEffect } from 'react'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

interface AuthContextType {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken: string | null = localStorage.getItem('token')
    if (savedToken !== null) {
      setToken(savedToken)
    }
  }, [])

  async function login(username: string, password: string): Promise<void> {
    const response: Response = await fetch(API_BASE_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error('Identifiants invalides')
    }

    const data: { token: string } = await response.json()

    setToken(data.token)
    localStorage.setItem('token', data.token)
  }

  function logout(): void {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
