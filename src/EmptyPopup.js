function EmptyPopup({onClose}){
    return(
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Please enter atleast the task name</h2>
                <button onClick={onClose} className='modal-cancel'>Close</button>
            </div>
        </div>
    )
}

export default EmptyPopup;