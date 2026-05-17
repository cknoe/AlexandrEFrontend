import { useContext } from 'react'
import { CollectionContext } from '../components/Collections/CollectionContext'

export function useCollections() {
  const context = useContext(CollectionContext)

  if (!context) {
    throw new Error('useCollections must be used inside CollectionProvider')
  }

  return context
}
