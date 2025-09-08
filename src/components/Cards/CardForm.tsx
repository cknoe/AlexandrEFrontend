import { useState } from "react";
import { useModal } from "../Modal/ModalContext";
import type { CardData } from "./cardTypes";
import "../../css/form.css";

type CardFormProps = {
  updateCards: (newCard: CardData) => void;
};

export default function CardForm({ updateCards }: CardFormProps) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardText, setCardText] = useState("");
  const [cardContent, setCardContent] = useState("");
  const { closeModal } = useModal();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!cardTitle || !cardText) return; // validation simple

    const newCard: CardData = {
      cardTitle,
      cardText,
      cardContent,
    };

    updateCards(newCard);
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <label>Title</label>
      <input
        type="text"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        name="card-title"
      />

      <label>Text</label>
      <input
        type="text"
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
        name="card-text"
      />

      <label>Content</label>
      <input
        type="text"
        value={cardContent}
        onChange={(e) => setCardContent(e.target.value)}
        name="card-content"
      />

      <button type="submit">Entrer</button>
    </form>
  );
}