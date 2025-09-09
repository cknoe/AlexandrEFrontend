import { apiFecth } from './client'

export type ApiCard = {
  id: number
  title: string
  description: string
  content?: string
  ownerUsername: string
}

export type Card = {
  id: number
  cardTitle: string
  cardText: string
  cardContent: string
}

export async function getCards(): Promise<Card[]> {
  const response = apiFecth('/cards', { method: 'GET' })
  const apiCards: ApiCard[] = await response
  return apiCards.map(apiToCard)
}

export async function createCard(card: Omit<Card, 'id'>): Promise<Card> {
  const response = apiFecth('/cards', {
    method: 'POST',
    body: cardToApi(card),
  })
  return apiToCard(await response)
}

export async function deleteCard(cardId: number): Promise<void> {
  return apiFecth('/cards/' + cardId, {
    method: 'DELETE',
  })
}

export async function updateCard(
  cardId: number,
  card: Omit<Card, 'id'>,
): Promise<Card> {
  const response = apiFecth('/cards/' + cardId, {
    method: 'PUT',
    body: cardToApi(card),
  })
  return apiToCard(await response)
}

function cardToApi(card: Omit<Card, 'id'>): string {
  const payload = {
    title: card.cardTitle,
    description: card.cardText,
    ...(card.cardContent ? { content: card.cardContent } : {}),
  }
  return JSON.stringify(payload)
}

function apiToCard(apiCard: ApiCard): Card {
  return {
    id: apiCard.id,
    cardTitle: apiCard.title,
    cardText: apiCard.description,
    cardContent: apiCard.content || '',
  }
}
