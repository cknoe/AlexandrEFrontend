import { useState, useEffect, useCallback } from "react"
import type { CardData } from "../components/Cards/cardTypes"

const DRAFT_KEY = "draftCards"

function readDraftStorage(): CardData[] {
  const raw = localStorage.getItem(DRAFT_KEY)
  return raw ? JSON.parse(raw) : []
}

export function useDraftCards() {
  const [draftCards, setDraftCards] = useState<CardData[]>([])

  useEffect(() => {
    setDraftCards(readDraftStorage())
  }, [])

  const saveToStorage = useCallback((cards: CardData[]) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(cards))
  }, [])

  const addDraftCard = useCallback((card: CardData) => {
    const updated = [...draftCards, card]
    setDraftCards(updated)
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updated))
  }, [draftCards])

  const removeDraftCard = useCallback((cardId: number) => {
    const updated = draftCards.filter((_, i) => i !== cardId)
    setDraftCards(updated)
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updated))
  }, [draftCards])

  const updateDraftCard = useCallback((cardId: number, updatedCard: CardData) => {
    const updated = draftCards.map((c, i) => i === cardId ? updatedCard : c)
    setDraftCards(updated)
    saveToStorage(updated)
  }, [draftCards, saveToStorage])

  const clearDraft = useCallback(() => {
    setDraftCards([])
    localStorage.removeItem(DRAFT_KEY)
  }, [])

  return { draftCards, addDraftCard, removeDraftCard, updateDraftCard, clearDraft }
}
