import type { CardData } from '../Cards/cardTypes'

export type SaveDraftFormProps = {
  cardList: CardData[]
  onCreate?: (name: string, keepDraft: boolean, cardList: CardData[]) => void
  onAdd?: (
    collectionId: number | null,
    keepDraft: boolean,
    cardList: CardData[],
  ) => void
}
