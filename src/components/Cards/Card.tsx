import { useModal } from '../Modal/ModalContext'
import { Trash2 } from 'lucide-react'
import type { CardProps } from "./cardTypes";
import '../../css/card.css'
import LogoReact from '../../assets/logoreact.svg'

export default function Card({cardTitle, cardText, cardContent, updateCardsFunction}: CardProps) {
  const { openModal } = useModal()

  function handleClick(
    updateCardsFunction: () => void,
    openModal: (content: React.ReactNode) => void,
  ) {
    openModal(
          <Card
            cardTitle={cardTitle}
            cardText={cardText}
            cardContent={cardContent}
            updateCardsFunction={updateCardsFunction}
          />,
        );
  }

  return (
    <div className="card" onClick={() =>
        handleClick(updateCardsFunction!, openModal)}>
      <button className="delete-button" onClick={(e) => {e.stopPropagation();updateCardsFunction!();}}>
        <Trash2 className="w-4 h-4" />
      </button>
      <h2>{cardTitle}</h2>
      {cardContent == '' ? (
        <img src={LogoReact} alt="Logo React" width={200} height={200} />
      ) : (
        <p>{cardContent}</p>
      )}
      <p>{cardText}</p>
    </div>
  )
}