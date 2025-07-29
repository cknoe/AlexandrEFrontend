import { useModal } from '../Modal/ModalContext'
import '../../css/card.css'
import LogoReact from '../../assets/logoreact.svg'
import { Trash2 } from 'lucide-react'

export type CardProps = {
  updateCardsFunction?: () => void
  cardExist: boolean
  cardTitle?: string
  cardText?: string
  cardContent?: string
}

export default function Card({
  updateCardsFunction,
  cardExist,
  cardTitle = 'Create New Card',
  cardText = 'Click here to create a new Card',
  cardContent = '',
}: CardProps) {
  const { openModal } = useModal()

  function handleClick(
    cardExist: boolean,
    updateCardsFunction: () => void,
    openModal: (content: React.ReactNode) => void,
  ) {
    cardExist
      ? openModal(
          <Card
            cardTitle={cardTitle}
            cardText={cardText}
            cardContent={cardContent}
            cardExist={true}
          />,
        )
      : updateCardsFunction();
  }

  return (
    <div className="card" onClick={() =>
        handleClick(cardExist, updateCardsFunction!, openModal)}>
      {cardExist && <button className="delete-button" onClick={(e) => {e.stopPropagation();updateCardsFunction!();}}>
        <Trash2 className="w-4 h-4" />
      </button>}
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