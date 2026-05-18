import { useContext } from 'react'
import { DraftContext } from '../components/Draft/DraftContext'

export function useDraftCards() {
  const ctx = useContext(DraftContext)
  if (!ctx) throw new Error('useDrafts must be used within DraftProvider')
  return ctx
}
