import { useState, useEffect } from 'react'
import { fetchLogo } from '../utils/logoCache'

export function useLogo(domain: string) {
  const [logo, setLogo] = useState<string | null>(null)

  useEffect(() => {
    fetchLogo(domain).then(setLogo)
  }, [domain])

  return logo
}
