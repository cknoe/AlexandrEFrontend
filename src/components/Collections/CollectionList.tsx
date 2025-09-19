import '../../css/collection.css'

export default function CollectionList() {
    return (
        <div className='collection-list-div'>
            <div className="collection-list-title">
                Your collections
                <div className='collection-buttons-div'><button className='collection-button'>+</button></div>
            </div>
            <div className="collection">
                hello
                <div className='collection-buttons-div'><button className='collection-button'>+</button> <button className='red-button collection-button'>-</button></div>
            </div>
            <div className="collection">
                hello
                <div className='collection-buttons-div'><button className='collection-button'>+</button> <button className='red-button collection-button'>-</button></div>
            </div>
            <div className="collection">
                hello
                <div className='collection-buttons-div'><button className='collection-button'>+</button> <button className='red-button collection-button'>-</button></div>
            </div>
        </div>
        
    )
}