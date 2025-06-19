import { useState } from "react";
import "./Edit.css";

function Edit({todos, editIndex, setTodos, onCancel, closeModal}){
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    
    const handleSubmit = (e)=>{
        e.preventDefault();

        const date = todos[editIndex].date;
        const status = todos[editIndex].status
        const updatedTodo = { task, description, date, status};

        const updatedTodos = todos.map((todo,index)=>
            index === editIndex ? updatedTodo : todo
        );

        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        setTask("");
        setDescription("");
        closeModal();
    }
    const handleTask = (e)=>{
        setTask(e.target.value);
    }
    const handleDesc = (e)=>{
        setDescription(e.target.value);
    }
    return(
        <div className="modal-overlay">
            <div className='modal'>
                <h2>Editing task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={task} onChange={handleTask} placeholder="Task name"/><br/>
                    <textarea value={description} onChange={handleDesc} placeholder="Description"/><br/>
                    <button type="submit" className="form-button">Add</button>
                    <button onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Edit;