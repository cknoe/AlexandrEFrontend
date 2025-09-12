import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiLogin } from '../../api/auth'

interface AuthContextType {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  setTokenAndStore: (newToken: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

let globalSetToken: ((token: string) => void) | null = null;
let globalClearAuth: (() => void) | null = null;

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken: string | null = localStorage.getItem('token')
    if (savedToken !== null) {
      setTokenAndStore(savedToken)
    }
  }, [])

  async function login(username: string, password: string): Promise<void> {
    const response: Response = await apiLogin(username, password)

    if (!response.ok) {
      throw new Error('Identifiants invalides')
    }

    const data: { token: string } = await response.json()

    setTokenAndStore(data.token)
    localStorage.setItem('token', data.token)
  }

  function logout(): void {
    setTokenAndStore(null)
    localStorage.removeItem('token')
  }

  function setTokenAndStore(newToken: string | null) {
    setToken(newToken)
    if (newToken) localStorage.setItem('token', newToken)
    else localStorage.removeItem('token')
  }

  globalSetToken = setTokenAndStore
  globalClearAuth = logout

  return (
    <AuthContext.Provider value={{ token, login, setTokenAndStore, logout }}>
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

export function clearAuth() {
  if (globalClearAuth) globalClearAuth();
}

export function setTokenGlobal(token: string) {
  if (globalSetToken) globalSetToken(token)
}