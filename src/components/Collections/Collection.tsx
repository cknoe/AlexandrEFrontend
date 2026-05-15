import { useNavigate } from 'react-router-dom'
import type { CollectionData, CollectionProps } from './collectionTypes'
import { Pencil, PencilOff } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import CollectionForm from './CollectionForm'

export default function Collection(props: CollectionProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditingCollection, setIsEditingCollection] = useState<boolean>(false)

  useEffect(() => {
    if (props.isSelected) {
      document.title = props.collectionName
    }
  }, [props.isSelected, props.collectionName])

  function handleModifyCollection(updatedCollection: CollectionData) {
    props.updateFunction(props.collectionId, updatedCollection)
    setIsEditingCollection(false)
  }

  function handleEditCollectionButtonClick() {
    setIsEditingCollection((prev) => !prev)
  }

  useEffect(() => {
    if (!isEditingCollection) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => clearTimeout(id)
  }, [isEditingCollection])

  return (
    <>
      {isEditingCollection ? (
        <div
          className={`collection-update ${props.isSelected ? 'collection-selected' : ''}`}
        >
          <CollectionForm
            mode="update"
            updateFunction={handleModifyCollection}
            isShown
            ref={inputRef}
            initialData={props}
            onBlur={() => setIsEditingCollection(false)}
          ></CollectionForm>
          <div className="collection-buttons-div collection-buttons-div-show">
            <div> </div>
            <button
              className="collection-button red-button"
              onClick={() => setIsEditingCollection(false)}
            >
              <PencilOff size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`collection ${props.isSelected ? 'collection-selected' : ''}`}
          onClick={() => navigate(`/collections/${props.collectionId}`)}
        >
          <div className="collection-name">{props.collectionName}</div>
          <div
            className="collection-buttons-div"
            onClick={() => handleEditCollectionButtonClick()}
          >
            <button
              className="red-button collection-button"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                props.deleteFunction(props.collectionId)
              }}
            >
              -
            </button>
            <button className="collection-button">
              <Pencil size={16}></Pencil>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
