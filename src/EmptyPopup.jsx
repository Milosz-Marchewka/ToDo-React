
function EmptyPopup({textContent, onClose}){
    return(
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>{textContent}</h2>
                <button onClick={onClose} className='modal-cancel'>Close</button>
            </div>
        </div>
    )
}

export default EmptyPopup;