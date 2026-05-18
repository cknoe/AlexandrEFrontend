import { createContext } from 'react'
import type { CardData } from '../Cards/cardTypes'

type DraftContextValue = {
  draftCards: CardData[]
  addDraftCard: (card: CardData) => void
  removeDraftCard: (index: number) => void
  updateDraftCard: (index: number, card: CardData) => void
  clearDraft: () => void
}

export const DraftContext = createContext<DraftContextValue | undefined>(
  undefined,
)
