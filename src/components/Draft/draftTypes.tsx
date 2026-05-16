import type {CollectionData} from "../Collections/collectionTypes"

export type SaveDraftFormProps = {
  collections: CollectionData[]
  onCreate?: (name: string, keepDraft: boolean) => void
  onAdd?: (collectionId: number | null, keepDraft: boolean) => void
}