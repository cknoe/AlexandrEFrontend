import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { useAuth } from '../Authorization/AuthContext'
import SaveDraftForm from '../Draft/SaveDraftForm'
import CardsList from './CardsList'
import type { CardListMode } from './cardTypes'
import CardForm from './CardForm'
import type { CardData } from './cardTypes'
import { getCards, createCard, deleteCard, updateCard } from '../../api/cards'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCollectionById } from '../../api/collection'
import { useDraftCards } from '../../hooks/useDraftCards'

export default function CardsContainer() {
  const { collectionIdParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const collectionIdNumber = Number(collectionIdParam)
  const [cards, setCards] = useState<CardData[]>([])
  const { openModal, closeModal } = useModal()
  const { token } = useAuth()
  const { draftCards, addDraftCard, removeDraftCard, updateDraftCard } =
    useDraftCards()

  const isDraft = location.pathname === '/draft'
  const localToken = isDraft ? null : token

  useEffect(() => {
    if (isDraft) {
      document.title = 'Draft'
    } else if (!token) {
      navigate('/draft')
    } else if (!collectionIdNumber) {
      document.title = 'All Your cards'
    }
  }, [collectionIdNumber, isDraft, token, navigate])

  useEffect(() => {
    if (isDraft) {
      setCards(draftCards)
      return
    }

    if (!localToken) {
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
  }, [localToken, collectionIdNumber, isDraft, draftCards])

  async function handleAddCard(newCard: CardData) {
    setCards((prev) => [...prev, newCard])
    if (isDraft) addDraftCard(newCard)
    if (localToken) {
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
    if (isDraft) removeDraftCard(index)
    closeModal()
    if (localToken) {
      deleteCard(id)
    }
  }

  function handleUpdateCard(index: number, id: number, updatedCard: CardData) {
    setCards((prev) =>
      prev.map((card, i) => (i === index ? updatedCard : card)),
    )
    if (isDraft) updateDraftCard(index, updatedCard)
    if (localToken) {
      try {
        updateCard(id, updatedCard, updatedCard.collectionId!)
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

  function handleOpenSaveDraftModal(card: CardData, index: number) {
    openModal(<SaveDraftForm cardList={[card]} index={index} />)
  }

  function selectMode(): CardListMode {
    if (isDraft && token) return 'DraftCards'
    else if (!isNaN(collectionIdNumber) || isDraft) return 'CollectionCards'
    else return 'AllCards'
  }

  return (
    <CardsList
      cards={cards}
      addCard={handleAddCard}
      deleteCard={handleDeleteCard}
      updateCard={handleUpdateCard}
      openAddForm={handleOpenAddModal}
      openUpdateForm={handleOpenUpdateModal}
      openSaveDraftForm={handleOpenSaveDraftModal}
      mode={selectMode()}
    />
  )
}
