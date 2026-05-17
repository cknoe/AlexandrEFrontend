import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCollections } from '../../hooks/useCollection'
import type { SaveDraftFormProps } from './DraftTypes'
import type { CardData } from '../Cards/cardTypes'
import { createCardBatch } from '../../api/cards'
import { useModal } from '../../hooks/useModal'

async function handleOnAdd(cards: CardData[], collectionId: number | null) {
  if (!collectionId) {return}
  try {
    await createCardBatch(
      cards,
      collectionId,
    )
  } catch (err) {
    console.error('Error creating card :', err)
  }
}

export default function SaveDraftForm({
  cardList,
  onCreate,
}: SaveDraftFormProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'create' | 'add'>('create')
  const [createName, setCreateName] = useState<string>('')
  const { collections } = useCollections()
  const [createKeepDraft, setCreateKeepDraft] = useState<boolean>(true)
  const createInputRef = useRef<HTMLInputElement | null>(null)
  const { closeModal } = useModal()

  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(collections.length > 0 ? collections[0].collectionId : null)
  const [addKeepDraft, setAddKeepDraft] = useState<boolean>(true)
  const addSelectRef = useRef<HTMLSelectElement | null>(null)

  useEffect(() => {
    if (activeTab === 'create') {
      createInputRef.current?.focus()
    } else {
      addSelectRef.current?.focus()
    }
  }, [activeTab])

  useEffect(() => {
    if (collections.length > 0 && selectedCollectionId === null) {
      setSelectedCollectionId(collections[0].collectionId)
    }
  }, [collections, selectedCollectionId])

  function submitCreate(e?: React.FormEvent) {
    e?.preventDefault()
    if (!createName.trim()) return
    if (onCreate) onCreate(createName.trim(), createKeepDraft, cardList)
    else console.log('create collection', createName.trim(), createKeepDraft)
    setCreateName('')
  }

  async function submitAdd(e?: React.FormEvent) {
    e?.preventDefault()
    await handleOnAdd(cardList, selectedCollectionId)
    closeModal()
    navigate(`/collections/${selectedCollectionId}`)
  }

  return (
    <div className="save-draft">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'create' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          New
        </div>
        <div
          className={`tab ${activeTab === 'add' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add
        </div>
      </div>

      <div className="tab-panel">
        {activeTab === 'create' && (
          <form onSubmit={submitCreate} className="save-draft-tab-form">
            <label>Create a new Collection</label>
            <input
              ref={createInputRef}
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

            <button type="submit" className="save-draft-submit">
              Create
            </button>
          </form>
        )}

        {activeTab === 'add' && (
          <form onSubmit={submitAdd} className="save-draft-tab-form">
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
              {collections.length === 0 && (
                <option value="">No collections</option>
              )}
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

            <button type="submit" className="save-draft-submit" onClick={(e) => submitAdd(e)}>
              Add
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
