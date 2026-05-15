import '../../css/collection.css'

import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Collection from './Collection'
import type { CollectionData, CollectionFormProps } from './collectionTypes'
import { useEffect, useRef, useState, forwardRef } from 'react'
import { useAuth } from '../Authorization/AuthContext'
import {
  createCollection,
  deleteCollection,
  getCollections,
  modifyCollection,
} from '../../api/collection'
import CollectionForm from './CollectionForm'

const CollectionFormWithRef = forwardRef<HTMLInputElement, CollectionFormProps>(
  (props, ref) => <CollectionForm {...props} ref={ref} />,
)

export default function CollectionList() {
  const { collectionIdParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const { token } = useAuth()
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const isDraft = location.pathname === '/draft'
  const isRoot = location.pathname === '/'

  const collectionIdNumber = collectionIdParam
    ? Number(collectionIdParam)
    : null
  const invalidCollectionId =
    collectionIdNumber !== null && isNaN(collectionIdNumber)

  useEffect(() => {
    if (!token) {
      setCollections([])
      return
    }

    let isMounted = true
    async function fetchData() {
      try {
        const data = await getCollections()
        if (isMounted) setCollections(data)
      } catch (err) {
        console.error('Error fetching collections', err)
      }
    }
    fetchData()

    return () => {
      isMounted = false
    }
  }, [token])

  if (invalidCollectionId && token) {
    return <Navigate to="/" replace />
  }

  async function handleAddCollection(newCollection: CollectionData) {
    setCollections((prev) => [...prev, newCollection])

    try {
      const createdCollection = await createCollection(
        newCollection.collectionName,
      )

      setCollections((prev) =>
        prev.map((c) => (c === newCollection ? createdCollection : c)),
      )
      setIsAdding(false)

      navigate(`/collections/${createdCollection.collectionId}`)
    } catch (err) {
      console.error('Error creating collection:', err)
      setCollections((prev) => prev.filter((c) => c !== newCollection))
    }
  }

  function handleAddCollectionButtonClick() {
    setIsAdding((prev) => !prev)
    if (!isAdding) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  function handleDeleteCollection(collectionId: number) {
    setCollections((prev) =>
      prev.filter((collection) => collection.collectionId !== collectionId),
    )

    if (collectionIdNumber !== null && collectionIdNumber === collectionId) {
      navigate('/draft')
    }

    deleteCollection(collectionId).catch((err) => console.error(err))
  }

  function handleModifyCollection(
    collectionId: number,
    collectionUpdated: CollectionData,
  ) {
    setCollections((prev) =>
      prev.map((collection) =>
        collection.collectionId === collectionId
          ? { ...collection, collectionName: collectionUpdated.collectionName }
          : collection,
      ),
    )
    modifyCollection(collectionId, collectionUpdated.collectionName)
  }

  return (
    <div className="collection-list-div">
      <div
        className={`collection ${isDraft ? 'collection-selected' : ''}`}
        onClick={() => navigate(`/draft`)}
      >
        Draft
      </div>
      {token && (
        <>
          <div
            className={`collection ${isRoot ? 'collection-selected' : ''}`}
            onClick={() => navigate(`/`)}
          >
            Your Cards
          </div>

          <div className="collection-list-title">
            Your Collections
            <div className="collection-buttons-div">
              <button
                className={
                  isAdding
                    ? 'collection-button red-button'
                    : 'collection-button'
                }
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
              isSelected={collection.collectionId === collectionIdNumber}
              deleteFunction={handleDeleteCollection}
              updateFunction={handleModifyCollection}
            />
          ))}

          <CollectionFormWithRef
            mode="add"
            updateFunction={handleAddCollection}
            isShown={isAdding}
            ref={inputRef}
          />
        </>
      )}
    </div>
  )
}
