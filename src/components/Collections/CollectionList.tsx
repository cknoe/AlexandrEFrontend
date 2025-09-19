import '../../css/collection.css'

import { Navigate, useParams } from "react-router-dom";
import Collection from './Collection'
import type { CollectionProps } from "./collectionTypes"


export default function CollectionList() {
    const { collectionIdParam } = useParams();

    if (Number.isNaN(collectionIdParam)) {
        return <Navigate to="/" replace />;
    }

    const collections: CollectionProps[] = [
        {
            collectionName: "Films préférés",
            collectionId: "1",
        },
        {
            collectionName: "Livres à lire",
            collectionId: "2",
        },
        {
            collectionName: "Jeux vidéo",
            collectionId: "3",
        },
    ];

    return (
        <div className='collection-list-div'>
            <div className="collection-list-title">
                Your Collections
                <div className='collection-buttons-div'><button className='collection-button'>+</button></div>
            </div>
            {collections.map((collection) => (
                <Collection
                key={collection.collectionId}
                collectionId={collection.collectionId}
                collectionName={collection.collectionName}
                isSelected={collection.collectionId === collectionIdParam}
                />
            ))}
        </div>
        
    )
}