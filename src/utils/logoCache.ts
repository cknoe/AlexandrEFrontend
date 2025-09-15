export function getCachedLogo(domain: string): string | null {
  const cached = localStorage.getItem(`logo_${domain}`);
  return cached || null;
}

export function setCachedLogo(domain: string, logoUrl: string) {
  localStorage.setItem(`logo_${domain}`, logoUrl);
}

export async function fetchLogo(domain: string): Promise<string | null> {
  const cached = getCachedLogo(domain);
  if (cached) return cached;

  const logoUrl = `http://localhost:8080/api/logodev?domain=${domain}`;
  const response = await fetch(logoUrl)
  if (response.status === 202) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération du logo: ${response.status}`);
  }

  setCachedLogo(domain, logoUrl);
  return logoUrl;
}