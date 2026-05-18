import { fetchLogo } from '../api/logoDev'

export function getCachedLogo(domain: string): string | null {
  const cached = localStorage.getItem(`logo_${domain}`)
  return cached || null
}

export function setCachedLogo(domain: string, logoUrl: string) {
  localStorage.setItem(`logo_${domain}`, logoUrl)
}

export async function handleLogo(domain: string): Promise<string | null> {
  const cached = getCachedLogo(domain)
  if (cached) return cached

  const logoUrl = await fetchLogo(domain)
  console.log('logo url : ' + logoUrl)

  if (logoUrl != null) setCachedLogo(domain, logoUrl)
  return logoUrl
}
