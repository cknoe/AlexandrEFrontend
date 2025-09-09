const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFecth(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token')

  const response = await fetch(API_BASE_URL + path, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('API request failed with status ' + response.status)
  }

  if (response.ok) {
    const text = await response.text()
    return text ? JSON.parse(text) : null
  }
}
