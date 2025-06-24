import { useEffect, useState } from 'react'
import type { CardProps } from './Card'
import Card from './Card'

export default function CardsList() {
  const [cards, updateCards] = useState<CardProps[]>([])
  function addCard(title: string, text: string, content: string) {
    const newCard: CardProps = {
      cardTitle: title,
      cardText: text,
      cardContent: content,
      cardExist: true,
    }
    updateCards([...cards, newCard])
  }

  useEffect(() => {
    document.title = cards.length + ' Cartes'
  })

  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={card.cardTitle! + index}
          updateCards={() => {}}
          cardExist={true}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          cardContent={card.cardContent}
        />
      ))}
      <Card
        updateCards={addCard}
        cardExist={false}
        cardText={cards.length.toString() + ' Cartes existantes'}
        cardContent=""
      />
    </>
  )
}
