export type CardData = {
  id: number
  cardTitle: string
  cardText: string
  cardContent: string
  collectionId?: number
}

export type CardProps = CardData & {
  mode?: 'full_card' | 'compact_card'
  index: number
  deleteCardFunction: () => void
  updateCardFunction: (index: number, id: number, card: CardData) => void
  saveDraftCardFunction?: (card: CardData) => void
  isDraft?: boolean
}

export type CardListMode = 'AllCards' | 'CollectionCards' | 'DraftCards'
