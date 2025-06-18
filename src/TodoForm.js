import "./TodoForm.css";
import { useState } from "react";

function TodoForm({addTodo}){
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();

        const date = new Date(Date.now()).toUTCString();
        const status = false;
        addTodo({ task, description, status, date});
        setTask('');
        setDescription('');
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
        </>
    )
}

export default TodoForm;