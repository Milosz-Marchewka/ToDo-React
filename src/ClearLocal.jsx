import { useState } from "react";
import "./ClearLocal.css";
import DeleteModal from "./DeleteModal";

function ClearLocal({theme, todos, setTodos}){
    const [showModal, setShowModal] = useState(false);

    const clear = ()=>{
        localStorage.clear();
        setTodos([]);
        setShowModal(false);
    }

    return(
        todos.length > 0 && (
            <>
                <button style={{backgroundColor: theme.buttons.delete}} className='clear-local' onClick={()=>setShowModal(true)}>Clear</button>
                {showModal && <DeleteModal onCancel={()=>setShowModal(false)} onDelete={clear}/>}
            </> 
        )
    )
}

export default ClearLocal;