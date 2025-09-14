import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiLogin, apiRegister } from '../../api/auth'

interface AuthContextType {
  token: string | null
  contextUsername: string | null
  setTokenAndStore: (token: string | null) => void
  setUsernameAndStore: (username: string | null) => void
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
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
  const [contextUsername, setContextUsername] = useState<string | null>(null)

  useEffect(() => {
    const savedToken: string | null = localStorage.getItem('token')
    const savedUsername: string | null = localStorage.getItem('username')
    if (savedToken !== null) {
      setTokenAndStore(savedToken)
    }
    if (savedUsername !== null) {
      setUsernameAndStore(savedUsername)
    }
  }, [])

  async function login(username: string, password: string): Promise<void> {
    const response: Response = await apiLogin(username, password)

    if (!response.ok) {
      throw new Error('Invalid Identifiers')
    }

    const data: { token: string } = await response.json()

    setTokenAndStore(data.token)
    setUsernameAndStore(username)
  }

  async function register(username: string, password: string): Promise<void> {
    const response: Response = await apiRegister(username, password)

    if (!response.ok) {
      throw new Error('User ' + username + ' already exists')
    }

    const data: { token: string } = await response.json()

    setTokenAndStore(data.token)
    setUsernameAndStore(username)
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

  function setUsernameAndStore(username: string | null) {
    setContextUsername(username)
    if (username) localStorage.setItem('username', username)
    else localStorage.removeItem('username')
  }

  globalSetToken = setTokenAndStore
  globalClearAuth = logout

  return (
    <AuthContext.Provider value={{ token, contextUsername, setTokenAndStore, setUsernameAndStore, login, register, logout }}>
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