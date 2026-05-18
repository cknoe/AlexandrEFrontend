import { useState, useEffect } from 'react'
import { handleLogo } from '../utils/logoCache'

export function useLogo(domain: string) {
  const [logo, setLogo] = useState<string | null>(null)

  useEffect(() => {
    handleLogo(domain).then(setLogo)
  }, [domain])

  return logo
}
