import React, { useEffect, useRef, useState } from 'react'
import type { CollectionSaveDraftFormProps } from './collectionTypes'

export default function CollectionSaveDraftForm({
  collections,
  onCreate,
  onAdd,
}: CollectionSaveDraftFormProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'add'>('create')

  // Create form state
  const [createName, setCreateName] = useState<string>('')
  const [createKeepDraft, setCreateKeepDraft] = useState<boolean>(true)
  const createInputRef = useRef<HTMLInputElement | null>(null)

  // Add form state
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
    // keep selectedCollectionId in sync when collections prop changes
    if (collections.length > 0 && selectedCollectionId === null) {
      setSelectedCollectionId(collections[0].collectionId)
    }
  }, [collections, selectedCollectionId])

  function submitCreate(e?: React.FormEvent) {
    e?.preventDefault()
    if (!createName.trim()) return
    if (onCreate) onCreate(createName.trim(), createKeepDraft)
    else console.log('create collection', createName.trim(), createKeepDraft)
    setCreateName('')
  }

  function submitAdd(e?: React.FormEvent) {
    e?.preventDefault()
    if (onAdd) onAdd(selectedCollectionId, addKeepDraft)
    else console.log('add to collection', selectedCollectionId, addKeepDraft)
  }

  return (
    <div className="collection-save-draft">
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
          <form onSubmit={submitCreate} className="collection-tab-form">
            <label>Create a new Collection</label>
            <input
              ref={createInputRef}
              type="text"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder="New collection name"
              className="collection-input"
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
          <form onSubmit={submitAdd} className="collection-tab-form">
            <label>Add to existing Collection</label>
            <select
              ref={addSelectRef}
              value={selectedCollectionId ?? ''}
              onChange={(e) => {
                const v = e.target.value
                setSelectedCollectionId(v === '' ? null : Number(v))
              }}
              className="collection-select"
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

            <button type="submit" className="save-draft-submit">
              Add
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
