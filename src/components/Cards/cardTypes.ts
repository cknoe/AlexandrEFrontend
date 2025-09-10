export type CardData = {
  id: number
  cardTitle: string
  cardText: string
  cardContent: string
}

export type CardProps = CardData & {
  mode?: 'full_card' | 'compact_card'
  index: number
  deleteCardFunction: () => void
  updateCardFunction: (index: number, id: number, card: CardData) => void
}
