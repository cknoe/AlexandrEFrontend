import { useState } from 'react'
import { useModal } from '../Modal/ModalContext'
import type { CardData } from './cardTypes'
import '../../css/form.css'

type CardFormProps = {
  mode: 'add' | 'update'
  updateCards: (newCard: CardData) => void
  initialData?: CardData
}

export default function CardForm({
  mode,
  updateCards,
  initialData,
}: CardFormProps) {
  const [id] = useState(initialData?.id || 0)
  const [cardTitle, setCardTitle] = useState(initialData?.cardTitle || '')
  const [cardText, setCardText] = useState(initialData?.cardText || '')
  const [cardContent, setCardContent] = useState(initialData?.cardContent || '')
  const { closeModal } = useModal()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!cardTitle || !cardText) return

    const newCard: CardData = {
      id,
      cardTitle,
      cardText,
      cardContent,
    }

    updateCards(newCard)
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <h2>{mode === 'add' ? 'Create Card' : 'Modify Card'}</h2>
      <label>Title</label>
      <input
        type="text"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        name="card-title"
      />

      <label>Text</label>
      <textarea
        rows={3}
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
        name="card-text"
        className="card-form-text"
      />

      <label>Content</label>
      <input
        type="text"
        value={cardContent}
        onChange={(e) => setCardContent(e.target.value)}
        name="card-content"
      />

      <button type="submit">{mode === 'add' ? 'Create' : 'Modify'}</button>
    </form>
  )
}
