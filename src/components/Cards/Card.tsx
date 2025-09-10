import { Trash2, Pencil } from 'lucide-react'

import { useModal } from '../Modal/ModalContext'
import type { CardProps } from './cardTypes'
import CardContentRenderer from './CardContentRenderer'

import '../../css/card.css'

export default function Card({
  mode = 'compact_card',
  id,
  index,
  cardTitle,
  cardText,
  cardContent,
  deleteCardFunction,
  updateCardFunction,
}: CardProps) {
  const { openModal } = useModal()

  function handleClick(
    deleteCardFunction: () => void,
    openModal: (content: React.ReactNode) => void,
  ) {
    if (mode === 'compact_card') {
      openModal(
        <Card
          mode="full_card"
          id={id}
          index={index}
          cardTitle={cardTitle}
          cardText={cardText}
          cardContent={cardContent}
          deleteCardFunction={deleteCardFunction}
          updateCardFunction={updateCardFunction}
        />,
      )
    }
  }

  return (
    <div
      className="card"
      onClick={() => handleClick(deleteCardFunction, openModal)}
    >
      <button
        className="card-button delete-button"
        onClick={(e) => {
          e.stopPropagation()
          deleteCardFunction()
        }}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <button
        className="card-button update-button"
        onClick={(e) => {
          e.stopPropagation()
          updateCardFunction(index, id, {
            id,
            cardTitle,
            cardText,
            cardContent,
          })
        }}
      >
        <Pencil className="w-4 h-4" />
      </button>

      <h2>{cardTitle}</h2>

      { cardContent ?
        <>
          <CardContentRenderer url={cardContent} mode={mode} />
          <p className='card-text'>{cardText}</p>
        </>
        :
        <p className='card-text card-text-without-content'>{cardText}</p>
      }
      
      
    </div>
  )
}
