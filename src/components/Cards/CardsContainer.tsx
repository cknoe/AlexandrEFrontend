import { useEffect, useState } from 'react'
import { useModal } from '../Modal/ModalContext'
import { useAuth } from '../Authorization/AuthContext'
import CardsList from './CardsList'
import CardForm from './CardForm'
import type { CardData } from './cardTypes'
import { getCards, createCard, deleteCard, updateCard } from '../../api/cards'
import { useParams } from 'react-router-dom'
import { getCollectionById } from '../../api/collection'

export default function CardsContainer() {
  const { collectionIdParam } = useParams()
  const collectionIdNumber = Number(collectionIdParam)
  const [cards, setCards] = useState<CardData[]>([])
  const { openModal, closeModal } = useModal()
  const { token } = useAuth()

  useEffect(() => {
    document.title = cards.length + ' Cartes'
  }, [cards])

  useEffect(() => {
    if (!token) {
      setCards([])
      return
    }

    async function fetchAllCards() {
      const data = await getCards()
      setCards(data)
    }

    async function fetchCollectionCards(id: number) {
      const data = await getCollectionById(id)
      setCards(data)
    }

    if (isNaN(collectionIdNumber)) {
      fetchAllCards()
    } else {
      fetchCollectionCards(Number(collectionIdNumber))
    }
  }, [token, collectionIdNumber])

  async function handleAddCard(newCard: CardData) {
    setCards((prev) => [...prev, newCard])
    if (token) {
      try {
        const createdCard = await createCard(
          newCard,
          Number(collectionIdNumber),
        )
        setCards((prev) =>
          prev.map((card) => (card === newCard ? createdCard : card)),
        )
      } catch (err) {
        console.error('Error creating card :', err)
      }
    }
  }

  function handleDeleteCard(index: number, id: number) {
    setCards((prev) => prev.filter((_, i) => i !== index))
    closeModal()
    if (token) {
      deleteCard(id)
    }
  }

  function handleUpdateCard(index: number, id: number, updatedCard: CardData) {
    setCards((prev) =>
      prev.map((card, i) => (i === index ? updatedCard : card)),
    )
    if (token) {
      try {
        updateCard(id, updatedCard, Number(collectionIdNumber))
      } catch (err) {
        console.error('Error updating card :', err)
      }
    }
  }

  function handleOpenAddModal() {
    openModal(<CardForm mode="add" updateCards={handleAddCard} />)
  }

  function handleOpenUpdateModal(index: number, id: number, card: CardData) {
    openModal(
      <CardForm
        mode="update"
        updateCards={(updatedCard) => handleUpdateCard(index, id, updatedCard)}
        initialData={card}
      />,
    )
  }

  return (
    <CardsList
      cards={cards}
      addCard={handleAddCard}
      deleteCard={handleDeleteCard}
      updateCard={handleUpdateCard}
      openAddForm={handleOpenAddModal}
      openUpdateForm={handleOpenUpdateModal}
    />
  )
}
