import { useModal } from '../Modal/ModalContext'
import CardForm from './CardForm'
import '../../css/card.css'
import LogoReact from '../../assets/logoreact.svg'

export type CardProps = {
  updateCards?: (title: string, text: string, content: string) => void
  cardExist: boolean
  cardTitle?: string
  cardText?: string
  cardContent?: string
}

export default function Card({
  updateCards,
  cardExist,
  cardTitle = 'Create New Card',
  cardText = 'Click here to create a new Card',
  cardContent = '',
}: CardProps) {
  const { openModal } = useModal()
  return (
    <div
      className="card"
      onClick={(event) =>
        handleClick(event, cardTitle, cardExist, updateCards!, openModal)
      }
    >
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

function handleClick(
  event: React.MouseEvent<HTMLDivElement>,
  cardText: string,
  cardExist: boolean,
  updateCards: (title: string, text: string, content: string) => void,
  openModal: (content: React.ReactNode) => void,
) {
  cardExist
    ? alert('carte sélectionnée : ' + cardText)
    : openModal(<CardForm updateCards={updateCards} />)
  console.log(event)
}
