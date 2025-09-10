const LOGO_DEV_KEY = import.meta.env.VITE_LOGO_DEV_KEY

export function getCachedLogo(domain: string): string | null {
  const cached = localStorage.getItem(`logo_${domain}`);
  return cached || null;
}

export function setCachedLogo(domain: string, logoUrl: string) {
  localStorage.setItem(`logo_${domain}`, logoUrl);
}

export async function fetchLogo(domain: string): Promise<string> {
  const cached = getCachedLogo(domain);
  if (cached) return cached;

  const logoUrl = `https://img.logo.dev/${domain}?token=${LOGO_DEV_KEY}`;
  setCachedLogo(domain, logoUrl);
  return logoUrl;
}