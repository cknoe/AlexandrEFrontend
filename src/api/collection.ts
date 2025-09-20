import { apiToCard, type ApiCard, type Card } from './cards'
import { apiFecth } from './client'

export type Collection = {
  collectionId: number
  collectionName: string
  isSelected?: boolean
}

export type ApiCollection = {
  id: number
  name: string
  cards: ApiCard[]
}

export async function getCollections(): Promise<Collection[]> {
  const response = await apiFecth('/collections', { method: 'GET' })
  const apiCollections: ApiCollection[] = await response
  return apiCollections.map(apiToCollection)
}

export async function getCollectionById(id: number): Promise<Card[]> {
  const response: Promise<ApiCollection> = apiFecth('/collections/' + id, {
    method: 'GET',
  })
  const apiCards: ApiCard[] = (await response).cards
  return apiCards.map(apiToCard)
}

export async function createCollection(
  collectionName: string,
): Promise<Collection> {
  const response = apiFecth('/collections', {
    method: 'POST',
    body: '{"name": "' + collectionName + '"}',
  })
  return apiToCollection(await response)
}

function apiToCollection(apiCollection: ApiCollection): Collection {
  return {
    collectionId: apiCollection.id,
    collectionName: apiCollection.name,
  }
}
