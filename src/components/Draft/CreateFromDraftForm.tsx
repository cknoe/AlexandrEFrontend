import { useEffect, useState } from 'react'
import { useCollections } from '../../hooks/useCollection'
import type { CardData } from '../Cards/cardTypes'
import { createCollection, type Collection } from '../../api/collection'
import { createCardBatch } from '../../api/cards'
import { useModal } from '../../hooks/useModal'
import { useNavigate } from 'react-router-dom'
import { useDraftCards } from '../../hooks/useDraftCards'

export type CreateFromDraftProps = {
  handleKeepDraft: () => void
  cards: CardData[]
}

export default function CreateFromDraftForm({
  handleKeepDraft,
  cards,
}: CreateFromDraftProps) {
  const navigate = useNavigate()
  const [createKeepDraft, setCreateKeepDraft] = useState<boolean>(true)
  const [createName, setCreateName] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { setCollections } = useCollections()
  const { closeModal } = useModal()
  const { draftCards } = useDraftCards()

  useEffect(() => {
    if (draftCards.length === 0) {
      setErrorMessage('No draft cards to save')
    }
  }, [draftCards])

  async function handleOnCreate(
    cards: CardData[],
    collectionName: string,
  ): Promise<Collection> {
    try {
      const createdCollection = await createCollection(collectionName)
      await createCardBatch(cards, createdCollection.collectionId)
      return createdCollection
    } catch (error) {
      console.error('Error creating collection :', error)
      throw error
    }
  }

  async function submitCreate(e?: React.FormEvent) {
    e?.preventDefault()
    if (!createName.trim()) return
    try {
      const createdCollection = await handleOnCreate(cards, createName.trim())
      setCreateName('')
      setCollections((prev) => [...prev, createdCollection])
      closeModal()
      navigate(`/collections/${createdCollection.collectionId}`)
      if (!createKeepDraft) handleKeepDraft()
    } catch (error) {
      console.log('Could not submit save-draft to new collection : ' + error)
    }
  }

  return (
    <form onSubmit={submitCreate} className="save-draft-form">
      <label>Create a new Collection</label>
      <input
        type="text"
        value={createName}
        onChange={(e) => setCreateName(e.target.value)}
        placeholder="New collection name"
        className="save-draft-input"
      />

      <label className="keep-draft">
        <input
          type="checkbox"
          checked={createKeepDraft}
          onChange={(e) => setCreateKeepDraft(e.target.checked)}
        />
        Keep draft
      </label>

      <button
        type="submit"
        className="save-draft-submit"
        disabled={draftCards.length === 0}
        onClick={(e) => submitCreate(e)}
      >
        Create
      </button>
      <div className="error-message">{errorMessage}</div>
    </form>
  )
}
