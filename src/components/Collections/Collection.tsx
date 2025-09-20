import { useNavigate } from 'react-router-dom'
import type { CollectionProps } from './collectionTypes'
import { Pencil } from 'lucide-react'

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
        <button className="collection-button">
          <Pencil size={16}></Pencil>
        </button>
        <button
          className="red-button collection-button"
          onClick={() => props.deleteFunction(props.collectionId)}
        >
          -
        </button>
      </div>
    </div>
  )
}
