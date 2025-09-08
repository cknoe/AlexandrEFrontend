import { useEffect, useState } from "react";
import { useModal } from "../Modal/ModalContext";
import { useAuth } from "../Authorization/AuthContext";
import CardsList from "./CardsList";
import CardForm from "./CardForm";
import type { CardData } from "./cardTypes";
import { getCards, createCard, deleteCard } from "../../api/cards";


export default function CardsContainer() {
  const [cards, setCards] = useState<CardData[]>([]);
  const { openModal } = useModal();
  const { token } = useAuth();

  useEffect(() => {
    document.title = cards.length + " Cartes";
  }, [cards]);

  useEffect(() => {
    if (!token) return;
    
    async function fetchData() {
      const data = await getCards();
      setCards(data);
    }
    fetchData();
  }, [token]);

  async function handleAddCard(newCard: CardData) {
    setCards((prev) => [...prev, newCard]);
    if (token) {
      try {
        const createdCard = await createCard(newCard);
        setCards((prev) =>
          prev.map((card) => (card === newCard ? createdCard : card))
        );
      } catch (err) {
        console.error("Error creating card :", err);
      }
    } 
  }

  function handleDeleteCard(index: number, id: number) {
    setCards((prev) => prev.filter((c, i) => c.id !== id && i !== index));
    if (token) {deleteCard(id);}
  }

  function handleOpenModal () {
    openModal(<CardForm updateCards={handleAddCard} />);
  }

  return (
    <CardsList
      cards={cards}
      addCard={handleAddCard}
      deleteCard={handleDeleteCard}
      openForm={handleOpenModal}
    />
  );
}