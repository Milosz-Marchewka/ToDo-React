import "./TodoForm.css";
import EmptyPopup from "./EmptyPopup";
import { useState } from "react";

function TodoForm({addTodo}){
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [showEmpty, setShowEmpty] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const date = new Date(Date.now()).getTime();
        const status = false;
        if(task.trim().length > 0){
            addTodo({ task, description, status, date});
            setTask('');
            setDescription('');
        } else {
            setShowEmpty(true);
        }
    };

    const handleTask = (e)=>{
        setTask(e.target.value);
    }
    const handleTextarea = (e)=>{
        setDescription(e.target.value);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={handleTask} placeholder="Task name"/><br/>
                <textarea value={description} onChange={handleTextarea} placeholder="Description"/><br/>
                <button type="submit" className="form-button">Add</button>
            </form>
            { showEmpty &&
                <EmptyPopup
                    onClose={()=>setShowEmpty(false)}
                />
            }
        </>
    )
}

export default TodoForm;