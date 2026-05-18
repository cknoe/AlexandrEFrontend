import '../../css/collection.css'

import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Save } from 'lucide-react'
import Collection from './Collection'
import type { CollectionData } from './collectionTypes'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Authorization/AuthContext'
import { useModal } from '../../hooks/useModal'
import {
  createCollection,
  deleteCollection,
  getCollections,
  modifyCollection,
} from '../../api/collection'
import CollectionForm from './CollectionForm'
import SaveDraftForm from '../Draft/SaveDraftForm'
import { useCollections } from '../../hooks/useCollection'

export default function CollectionList() {
  const { collectionIdParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const { token } = useAuth()
  const { openModal } = useModal()
  const { collections, setCollections } = useCollections()
  const [isAdding, setIsAdding] = useState(false)
  const [isTrayHidden, setIsTrayHidden] = useState(false) 

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
  }, [token, setCollections])

  useEffect(() => {
    if (!isAdding) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => clearTimeout(id)
  }, [isAdding])

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

  function handleSaveDraftButtonClick() {
    openModal(<SaveDraftForm />)
  }

  function handleAddCollectionButtonClick() {
    setIsAdding((prev) => !prev)
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
    <div className={isTrayHidden ? 'collection-wrapper hide-collection-tray' : 'collection-wrapper'}>
      <div className='collection-list-div'>
        <div
          className={`collection ${isDraft ? 'collection-selected' : ''}`}
          onClick={() => navigate(`/draft`)}
        >
          <div>Draft</div>
          {token ? (
            <button
              className="collection-button"
              onClick={handleSaveDraftButtonClick}
            >
              {' '}
              <Save size={16} />{' '}
            </button>
          ) : (
            ''
          )}
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
                  onMouseDown={(e) => e.preventDefault()}
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

            <CollectionForm
              mode="add"
              updateFunction={handleAddCollection}
              isShown={isAdding}
              ref={inputRef}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsAdding(false)
                }
              }}
            />
          </>
        )}
      </div>
      <div className="hide-collection-list-div" onClick={() => setIsTrayHidden(!isTrayHidden)}> {isTrayHidden ? '>' : '<'} </div>
    </div>
  )
}
