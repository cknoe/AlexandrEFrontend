import { Trash2, Pencil, Save } from 'lucide-react'

import { useModal } from '../../hooks/useModal'
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
  saveDraftCardFunction,
  isDraft = false,
}: CardProps) {
  const { openModal } = useModal()

  function handleClick(
    deleteCardFunction: () => void,
    openModal: (content: React.ReactNode) => void,
  ) {
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
        saveDraftCardFunction={saveDraftCardFunction}
        isDraft={isDraft}
      />,
    )
  }

  return (
    <div
      className="card"
      onClick={() => {
        if (mode === 'compact_card') {
          handleClick(deleteCardFunction, openModal)
        }
      }}
    >
      <button
        className="card-button delete-button red-button"
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

      {isDraft ? (
        <button
          className="card-button save-draft-button"
          onClick={(e) => {
            e.stopPropagation()
            if (saveDraftCardFunction) {
              saveDraftCardFunction({
                id,
                cardTitle,
                cardText,
                cardContent,
              })
            }
          }}
        >
          <Save className="w-4 h-4" />
        </button>
      ) : (
        ''
      )}

      <h2>{cardTitle}</h2>

      {cardContent ? (
        <>
          <CardContentRenderer url={cardContent} mode={mode} />
          <p className="card-text">{cardText}</p>
        </>
      ) : (
        <p className="card-text card-text-without-content">{cardText}</p>
      )}
    </div>
  )
}
