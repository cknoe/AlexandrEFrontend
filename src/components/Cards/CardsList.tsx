import Card from "./Card";
import type { CardData } from "./cardTypes";
import LogoReact from "../../assets/logoreact.svg";

type CardsListProps = {
  cards: CardData[];
  deleteCard: (index: number, id: number) => void;
  addCard: (card: CardData) => void;
  openForm: () => void;
};

export default function CardsList({
  cards = [],
  deleteCard,
  openForm,
}: CardsListProps) {
  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={card.cardTitle + index}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          cardContent={card.cardContent}
          updateCardsFunction={() => deleteCard(index, card.id!)}
        />
      ))}

      <div className="card" onClick={openForm}>
        <h2>Create New Card</h2>
        <img src={LogoReact} alt="Logo React" width={200} height={200} />
        <p>{cards.length} Cartes existantes</p>
      </div>
    </>
  );
}