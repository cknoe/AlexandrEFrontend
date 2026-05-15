import type { CollectionData, CollectionFormProps } from './collectionTypes'
import { useState, forwardRef } from 'react'

const CollectionForm = forwardRef<HTMLInputElement, CollectionFormProps>(
  (props, ref) => {
    const [collectionName, setCollectionName] = useState<string>(
      props.initialData?.collectionName || '',
    )

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      if (collectionName === '') return
      const collection: CollectionData = {
        collectionId: 0,
        collectionName: collectionName,
      }
      setCollectionName('')
      props.updateFunction(collection)
    }

    return (
      <div className="collection-form-div">
        <form
          className={`collection-form ${
            props.isShown
              ? 'collection-form-active'
              : 'collection-form-inactive'
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
          {props.mode === 'add' ? (
            <button type="submit" className="collection-button">
              {' '}
              +{' '}
            </button>
          ) : (
            ''
          )}
          <div> </div>
        </form>
      </div>
    )
  },
)

export default CollectionForm
