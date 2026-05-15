export type CollectionData = {
  collectionName: string
  collectionId: number
  isSelected?: boolean
}

export type CollectionProps = CollectionData & {
  deleteFunction: (collectionId: number) => void
  updateFunction: (
    collectionId: number,
    updatedCollection: CollectionData,
  ) => void
}

export type CollectionFormProps = {
  mode: 'add' | 'update'
  updateFunction: (newCollection: CollectionData) => void
  isShown: boolean
  initialData?: CollectionData
  onBlur?: (e: React.FocusEvent<HTMLFormElement>) => void
}
