import React, { createContext } from 'react'
import type { CollectionData } from './collectionTypes'

type CollectionContextType = {
  collections: CollectionData[]
  setCollections: React.Dispatch<React.SetStateAction<CollectionData[]>>
}

export const CollectionContext = createContext<
  CollectionContextType | undefined
>(undefined)
