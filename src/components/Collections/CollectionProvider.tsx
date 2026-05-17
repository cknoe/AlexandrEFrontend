import React, { useState } from 'react'
import type { CollectionData } from './collectionTypes'
import { CollectionContext } from './CollectionContext'

type CollectionProviderProps = {
  children: React.ReactNode
}

export function CollectionProvider({ children }: CollectionProviderProps) {
  const [collections, setCollections] = useState<CollectionData[]>([])

  return (
    <CollectionContext.Provider
      value={{
        collections,
        setCollections,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}
