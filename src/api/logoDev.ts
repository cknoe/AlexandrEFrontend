import { API_BASE_URL } from './client'
import { apiFecthNonAuthenticated } from './client'

export async function fetchLogo(domain: string): Promise<string | null> {
  const endpoint = `/api/logodev?domain=` + domain
  const response = await apiFecthNonAuthenticated(endpoint)

  if (!response.ok) return null
  return API_BASE_URL + endpoint
}
