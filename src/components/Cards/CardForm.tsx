import { useState } from 'react'
import { useModal } from '../Modal/ModalContext'
import '../../css/form.css'

type CardFormProp = {
  updateCards: (title: string, text: string, content: string) => void
}

export default function ({ updateCards }: CardFormProp) {
  const [cardTitle, setCardTitle] = useState('')
  const [cardText, setCardText] = useState('')
  const [cardContent, setCardContent] = useState('')
  const { closeModal } = useModal()

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    updateCards: (title: string, text: string, content: string) => void,
    closeModal: () => void,
  ) {
    event.preventDefault()
    if (cardTitle != '' && cardText != '') {
      updateCards(cardTitle, cardText, cardContent)
      closeModal()
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event, updateCards, closeModal)}
      className="card-form"
    >
      <label>Title</label>
      <input
        type="text"
        value={cardTitle}
        name="card-title"
        onChange={(e) => setCardTitle(e.target.value)}
      />
      <label>Text</label>
      <input
        type="text"
        value={cardText}
        name="card-text"
        onChange={(e) => setCardText(e.target.value)}
      />
      <label>Content</label>
      <input
        type="text"
        value={cardContent}
        name="card-content"
        onChange={(e) => setCardContent(e.target.value)}
      />
      <br/>
      <button type="submit">Entrer</button>
    </form>
  )
}
