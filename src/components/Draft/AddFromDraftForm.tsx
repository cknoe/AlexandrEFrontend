import { useEffect, useState } from "react"
import type { CardData } from "../Cards/cardTypes"
import { createCardBatch } from "../../api/cards"
import { useNavigate } from "react-router-dom"
import { useModal } from "../../hooks/useModal"
import { useCollections } from "../../hooks/useCollection"
import { useDraftCards } from "../../hooks/useDraftCards"

export type AddFromDraftProps = {
  addSelectRef: React.RefObject<HTMLSelectElement | null>
  handleKeepDraft: () => void
  cards: CardData[]
}

export default function AddFromDraftForm({cards, handleKeepDraft, addSelectRef}: AddFromDraftProps) {
  const navigate = useNavigate()
  const [addKeepDraft, setAddKeepDraft] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { collections } = useCollections() 
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(collections.length > 0 ? collections[0].collectionId : null)
  const { closeModal } = useModal()
  const { draftCards } = useDraftCards()

  useEffect(() => {
    if (collections.length === 0) {
      setErrorMessage('No collections available')
    }
    if (draftCards.length === 0) {
      setErrorMessage('No draft cards to save')
    }
  }, [draftCards, collections])

  useEffect(() => {
    if (collections.length > 0 && selectedCollectionId === null) {
      setSelectedCollectionId(collections[0].collectionId)
    }
  }, [collections, selectedCollectionId])

  async function handleOnAdd(cards: CardData[], collectionId: number | null) {
    if (!collectionId) {
      return
    }
    try {
      await createCardBatch (cards, collectionId)
    } catch (error) {
      console.error('Error creating cards :', error)
    }
  }

  async function submitAdd(e?: React.FormEvent) {
    e?.preventDefault()
    await handleOnAdd(cards, selectedCollectionId)
    closeModal()
    navigate(`/collections/${selectedCollectionId}`)
    if (!addKeepDraft) handleKeepDraft()
  }
  return (
    <form onSubmit={submitAdd} className="save-draft-form">
      <label>Add to existing Collection</label>
      <select
        ref={addSelectRef}
        value={selectedCollectionId ?? ''}
        onChange={(e) => {
          const v = e.target.value
          setSelectedCollectionId(v === '' ? null : Number(v))
        }}
        className="save-draft-select"
      >
        {collections.length === 0 && <option value="">No collections</option>}
        {collections.map((c) => (
          <option key={c.collectionId} value={c.collectionId}>
            {c.collectionName}
          </option>
        ))}
      </select>

      <label className="keep-draft">
        <input
          type="checkbox"
          checked={addKeepDraft}
          onChange={(e) => setAddKeepDraft(e.target.checked)}
        />
        Keep draft
      </label>

      <button
        type="submit"
        className="save-draft-submit"
        disabled={collections.length === 0 || draftCards.length === 0}
        onClick={(e) => submitAdd(e)}
      >
        Add
      </button>
      <div className="error-message">{errorMessage}</div>
    </form>
  )
}
