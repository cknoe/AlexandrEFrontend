import { apiFecthNonAuthenticated } from './client'

export type OpenGraph = {
  title: string
  image: string
  site: string
}

export async function fetchOpenGaph(url: string): Promise<OpenGraph | null> {
  const response = await apiFecthNonAuthenticated(`/api/opengraph?url=` + url)
  const openGraph: OpenGraph = JSON.parse(await response.text())

  if (!response.ok) return null
  return openGraph
}
