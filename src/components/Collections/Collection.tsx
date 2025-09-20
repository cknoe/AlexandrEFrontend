import { useNavigate } from 'react-router-dom'
import type { CollectionProps } from './collectionTypes'

export default function Collection(props: CollectionProps) {
  const navigate = useNavigate()

  return (
    <div
      className={`collection ${props.isSelected ? 'collection-selected' : ''}`}
      onClick={() => navigate(`/${props.collectionId}`)}
    >
      <div className="collection-name">{props.collectionName}</div>
      <div
        className="collection-buttons-div"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="collection-button">+</button>
        <button className="red-button collection-button">-</button>
      </div>
    </div>
  )
}
