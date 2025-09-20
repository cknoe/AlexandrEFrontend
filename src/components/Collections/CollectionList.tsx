import '../../css/collection.css'

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Collection from './Collection'
import type { CollectionData } from './collectionTypes'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Authorization/AuthContext'
import { createCollection, deleteCollection, getCollections } from '../../api/collection'
import CollectionForm from './CollectionForm'

export default function CollectionList() {
  const { collectionIdParam } = useParams()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const { token } = useAuth()
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [isAdding, setIsAdding] = useState<boolean>(false)

  useEffect(() => {
    if (!token) {
      setCollections([])
      return
    }

    async function fetchData() {
      const data = await getCollections()
      setCollections(data)
    }
    fetchData()
  }, [token])

  if (Number.isNaN(collectionIdParam)) {
    return <Navigate to="/" replace />
  }

  async function handleAddCollection(newCollection: CollectionData) {
    setCollections((prev) => [...prev, newCollection])
    const collectionIndex: number = collections.length
    try {
      const createdCollection = await createCollection(
        newCollection.collectionName,
      )
      setCollections((prev) =>
        prev.map((collection, index) =>
          index === collectionIndex ? createdCollection : collection,
        ),
      )
      setIsAdding(false)
      navigate(`/${createdCollection.collectionId}`)
    } catch (err) {
      console.error('Error creating collection :', err)
    }
  }

  function handleAddCollectionButtonClick() {
    if (!isAdding) {
      setIsAdding(true)
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setIsAdding(false)
    }
  }

  function handleDeleteCollection(collectionId: number) {
    setCollections((prev) =>
      prev.filter((collection) => collection.collectionId !== collectionId)
    )
    deleteCollection(collectionId)
  }

  return (
    <div className="collection-list-div">
      <div className="collection-list-title">
        Your Collections
        <div
          className={
            isAdding
              ? 'collection-buttons-div red-button'
              : 'collection-buttons-div'
          }
        >
          <button
            className="collection-button"
            onClick={handleAddCollectionButtonClick}
          >
            {isAdding ? 'x' : '+'}
          </button>
        </div>
      </div>
      {collections.map((collection) => (
        <Collection
          key={collection.collectionId}
          collectionId={collection.collectionId}
          collectionName={collection.collectionName}
          isSelected={String(collection.collectionId) === collectionIdParam}
          deleteFunction={handleDeleteCollection}
        />
      ))}
      <CollectionForm
        mode="add"
        updateFunction={handleAddCollection}
        isShown={isAdding}
        ref={inputRef}
      />
    </div>
  )
}
