import { useEffect, useState } from 'react'
import type { CardProps } from './Card'
import Card from './Card'
import CardForm from './CardForm'
import { useModal } from '../Modal/ModalContext'


export default function CardsList() {
  const [cards, updateCards] = useState<CardProps[]>([])
  const { openModal } = useModal()

  function addCard(title: string, text: string, content: string) {
    const newCard: CardProps = {
      cardTitle: title,
      cardText: text,
      cardContent: content,
      cardExist: true,
    }
    updateCards([...cards, newCard])
  }

  function deleteCard(indexToRemove: number) {
    updateCards(cards.filter((_, index) => index !== indexToRemove));
  }

  useEffect(() => {
    document.title = cards.length + ' Cartes'
  })

  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={card.cardTitle! + index}
          updateCardsFunction={() => deleteCard(index)}
          cardExist={true}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          cardContent={card.cardContent}
        />
      ))}
      <Card
        updateCardsFunction={() => openModal(<CardForm updateCards={addCard} />)}
        cardExist={false}
        cardText={cards.length.toString() + ' Cartes existantes'}
        cardContent=""
      />
    </>
  )
}
