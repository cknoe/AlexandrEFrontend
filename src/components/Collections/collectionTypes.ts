export type CollectionProps = {
  collectionName: string
  collectionId: number
  isSelected?: boolean
}

export type CollectionFormProps = {
  mode: 'add' | 'update'
  updateFunction: (newCollection: CollectionProps) => void
  isShown: boolean
}
