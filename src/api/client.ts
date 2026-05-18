import {
  setTokenGlobal,
  clearAuth,
} from '../components/Authorization/AuthContext'

export const API_BASE_URL =
  window.location.hostname === 'localhost'
  ? import.meta.env.VITE_API_BASE_URL
  :import.meta.env.VITE_API_BASE_URL_NETWORK

async function refreshAccessToken(): Promise<string> {
  const response = await apiFecthNonAuthenticated('/refresh-token', {
    method: 'POST',
  })

  if (!response.ok) {
    localStorage.removeItem('token')
    clearAuth()
    throw new Error('Invalid Refresh Token')
  }

  const data = await response.json()
  setTokenGlobal(data.token)
  return data.token
}

export async function apiFecth(path: string, options: RequestInit = {}) {
  let token = localStorage.getItem('token')

  async function doFetch(withToken: string | null): Promise<Response> {
    const response = await fetch(API_BASE_URL + path, {
      ...options,
      credentials: 'include',
      headers: {
        ...options.headers,
        ...(withToken ? { Authorization: 'Bearer ' + withToken } : {}),
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  let response = await doFetch(token)

  if (response.status === 403) {
    const newToken = await refreshAccessToken()
    token = newToken
    response = await doFetch(newToken)
  }

  if (!response.ok) {
    throw new Error('API request failed with status ' + response.status)
  }

  if (response.ok) {
    const text = await response.text()
    return text ? JSON.parse(text) : null
  }
}

export async function apiFecthNonAuthenticated(
  path: string,
  options: RequestInit = {},
) {
  const response: Response = await fetch(API_BASE_URL + path, {
    ...options,
    credentials: 'include',
  })

  return response
}
