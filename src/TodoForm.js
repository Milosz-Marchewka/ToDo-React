import "./TodoForm.css";
import EmptyPopup from "./EmptyPopup";
import { useEffect, useState } from "react";

function TodoForm({addTodo}){
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(toDateTimeLocalString());
    const [editedDate, setEditedDate] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);

    function toDateTimeLocalString(date = new Date()){
        const pad = (num)=>num.toString().padStart(2,'0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hour = pad(date.getHours());
        const minute = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const date = new Date().getTime();
        const status = false;
        if(task.trim().length > 0){
            addTodo({ task, description, status, date, dueDate});
            setTask('');
            setDescription('');
            setDueDate(toDateTimeLocalString());
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
    const handleDueDate = (e)=>{
        setDueDate(e.target.value);
        setEditedDate(true);
    }

    // updating the time input value 
    // if not edited every minute

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(!editedDate){
                if(editedDate != toDateTimeLocalString()){
                    setDueDate(toDateTimeLocalString());
                }
            }
        },1000);

        return ()=>clearInterval(interval);
    },[editedDate]);

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={handleTask} placeholder="Task name"/>
                <textarea value={description} onChange={handleTextarea} placeholder="Description"/>
                <label>Due date <button type='button' className='resetDateBtn' onClick={()=>{setDueDate(toDateTimeLocalString()); setEditedDate(false)}}>Current</button></label>
                <input type="datetime-local" value={dueDate} onChange={handleDueDate} />
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