import { useEffect, useState, useCallback } from 'react'
import type { CardData } from '../Cards/cardTypes'
import { DraftContext } from './DraftContext'

const DRAFT_KEY = 'draftCards'

function readDraftStorage(): CardData[] {
  const raw = localStorage.getItem(DRAFT_KEY)
  return raw ? JSON.parse(raw) : []
}

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const [draftCards, setDraftCards] = useState<CardData[]>(() =>
    readDraftStorage(),
  )

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftCards))
  }, [draftCards])

  const addDraftCard = useCallback((card: CardData) => {
    setDraftCards((prev) => [...prev, card])
  }, [])

  const removeDraftCard = useCallback((index: number) => {
    setDraftCards((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const updateDraftCard = useCallback((index: number, card: CardData) => {
    setDraftCards((prev) => prev.map((c, i) => (i === index ? card : c)))
  }, [])

  const clearDraft = useCallback(() => {
    setDraftCards([])
    localStorage.removeItem(DRAFT_KEY)
  }, [])

  return (
    <DraftContext.Provider
      value={{
        draftCards,
        addDraftCard,
        removeDraftCard,
        updateDraftCard,
        clearDraft,
      }}
    >
      {children}
    </DraftContext.Provider>
  )
}
