
export type CardData = {
  id?: number;
  cardTitle: string;
  cardText: string;
  cardContent: string;
};

export type CardProps = CardData & {
  updateCardsFunction: () => void
}