import '../../css/collection.css'

import { Navigate, useParams } from 'react-router-dom'
import Collection from './Collection'
import type { CollectionProps } from './collectionTypes'
import { useEffect, useState } from 'react'
import { useAuth } from '../Authorization/AuthContext'
import { getCollections } from '../../api/collection'

export default function CollectionList() {
  const { collectionIdParam } = useParams()
  const [collections, setCollections] = useState<CollectionProps[]>([])
  const { token } = useAuth()

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

  return (
    <div className="collection-list-div">
      <div className="collection-list-title">
        Your Collections
        <div className="collection-buttons-div">
          <button className="collection-button">+</button>
        </div>
      </div>
      {collections.map((collection) => (
        <Collection
          key={collection.collectionId}
          collectionId={collection.collectionId}
          collectionName={collection.collectionName}
          isSelected={String(collection.collectionId) === collectionIdParam}
        />
      ))}
    </div>
  )
}
