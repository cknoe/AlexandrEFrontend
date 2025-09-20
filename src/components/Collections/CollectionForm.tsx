import type { CollectionFormProps, CollectionProps } from './collectionTypes'
import { useState, forwardRef } from 'react'

const CollectionForm = forwardRef<HTMLInputElement, CollectionFormProps>(
  (props, ref) => {
    const [collectionName, setCollectionName] = useState<string>('')

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      if (collectionName === '') return
      const collection: CollectionProps = {
        collectionId: 0,
        collectionName: collectionName,
      }
      setCollectionName('')
      props.updateFunction(collection)
    }

    return (
      <form
        className={`collection-form ${
          props.isShown ? 'collection-form-active' : 'collection-form-inactive'
        }`}
        id="collection-form-add"
        onSubmit={handleSubmit}
      >
        <input
          ref={ref}
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          name="collection-name"
        />
        <button type="submit" className="collection-button">
          +
        </button>
      </form>
    )
  },
)

export default CollectionForm
