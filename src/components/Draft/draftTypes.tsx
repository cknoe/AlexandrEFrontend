import type { CollectionData } from '../Collections/collectionTypes'
import type { CardData } from '../Cards/cardTypes'

export type SaveDraftFormProps = {
  collections: CollectionData[]
  cardList: CardData[]
  onCreate?: (name: string, keepDraft: boolean, cardList: CardData[]) => void
  onAdd?: (
    collectionId: number | null,
    keepDraft: boolean,
    cardList: CardData[],
  ) => void
}
