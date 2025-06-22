import { useEffect, useState } from 'react'
import Card from './Card'

export default function CardsList() {
  const [cards, updateCards] = useState<string[]>([])
  const addCard = () => updateCards([...cards, 'new'])

  useEffect(() => {
    document.title = cards.length + ' Cartes'
  })

  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={card + index}
          updateCards={addCard}
          cardExist={true}
          cardTitle={card}
          cardText="HelloWorld"
        />
      ))}
      <Card
        updateCards={addCard}
        cardExist={false}
        cardText={cards.length.toString() + ' Cartes existantes'}
      />
    </>
  )
}
