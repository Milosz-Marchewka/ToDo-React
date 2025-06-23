import "./DeleteModal.css";
function DeleteModal({onCancel, onDelete}){
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Are you sure?</h2>
                <button className="modal-cancel" onClick={onCancel}>Cancel</button>
                <button className="modal-delete" onClick={onDelete}>Delete</button>
            </div>
        </div>
        
    )
}

export default DeleteModal;