import "./TodoForm.css";
import EmptyPopup from "./EmptyPopup";
import { useEffect, useState, useRef } from "react";

function TodoForm({theme, addTodo}){
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(toDateTimeLocalString());
    const [priority, setPriority] = useState(0);
    const [editedDate, setEditedDate] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);
    const [showDateErr, setShowDateErr] = useState(false);
    const dateRef = useRef(null);
    // blur causes the native datetime picker to hide
    // so it's not over the EmptyPopup
    const closeDate = ()=>{
        if(dateRef.current) dateRef.current.blur();
    }

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
            addTodo({ task, description, status, date, dueDate, priority});
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
        if(new Date(e.target.value) >= new Date(toDateTimeLocalString())){
            setDueDate(e.target.value);
            setEditedDate(true);
        } else {
            setShowDateErr(true);
            setDueDate(toDateTimeLocalString());
            closeDate();
        }
    }

    const handlePriority = (e)=>{
        setPriority(Number(e.target.value));
    }

    // updating the time input value 
    // if not edited every minute

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(!editedDate){
                if(editedDate !== toDateTimeLocalString()){
                    setDueDate(toDateTimeLocalString());
                }
            }
        },1000);

        return ()=>clearInterval(interval);
    },[editedDate]);

    return(
        <>
            <form style={{backgroundColor: theme.primary, color: theme.text}} onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={handleTask} placeholder="Task name"/>
                <textarea value={description} onChange={handleTextarea} placeholder="Description"/>
                <label >Due date <button style={{backgroundColor: theme.buttons.reset, color: theme.text}} type='button' className='resetDateBtn' onClick={()=>{setDueDate(toDateTimeLocalString()); setEditedDate(false)}}>Current</button></label>
                <input type="datetime-local" value={dueDate} onChange={handleDueDate} ref={dateRef}/>
                <label>Priority</label>
                <select value={priority} onChange={handlePriority}>
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                </select>
                <button type="submit" className="form-button">Add</button>
            </form>
            { showEmpty &&
                <EmptyPopup
                    textContent="Please enter atleast the task name."
                    onClose={()=>setShowEmpty(false)}
                />
            }
            { showDateErr &&
                <EmptyPopup
                    id = "dateErr"
                    textContent="You can't select the due date to be in the past."
                    onClose={()=>setShowDateErr(false)}
                />
            }
        </>
    )
}

export default TodoForm;