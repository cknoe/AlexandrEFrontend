import Card from './Card'
import type { CardData } from './cardTypes'
import { LucideSquarePlus } from 'lucide-react'

type CardsListProps = {
  cards: CardData[]
  addCard: (card: CardData) => void
  deleteCard: (index: number, id: number) => void
  updateCard: (index: number, id: number, updatedCard: CardData) => void
  openAddForm: () => void
  openUpdateForm: (index: number, id: number, initialCard: CardData) => void
}

export default function CardsList({
  cards = [],
  deleteCard,
  openAddForm,
  openUpdateForm,
}: CardsListProps) {
  return (
    <div className="card-list-div">
      {cards.map((card, index) => (
        <Card
          key={card.cardTitle + index}
          index={index}
          id={card.id}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          cardContent={card.cardContent}
          deleteCardFunction={() => deleteCard(index, card.id!)}
          updateCardFunction={() => openUpdateForm(index, card.id!, card)}
        />
      ))}

      <div className="card" onClick={openAddForm}>
        <h2>Create New Card</h2>
        <LucideSquarePlus
          className="add-card-logo"
          size={128}
          strokeWidth={0.7}
        />
        <p>{cards.length} Existing Cards</p>
      </div>
    </div>
  )
}
