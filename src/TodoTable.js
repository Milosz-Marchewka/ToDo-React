import "./TodoTable.css";
import DeleteModal from "./DeleteModal";
import Status from "./Status";
import { useState, useEffect } from "react";

function TodoTable({todos, setTodos}){
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    let sorted = [...todos].sort((a,b)=>a.status-b.status);

    useEffect(()=>{
        sorted = [...todos].sort((a,b)=>a.status-b.status);
    }, [todos])

    const deleteRow = (indexDelete)=>{
        const updatedTodos = todos.filter((_, index)=> index !== indexDelete);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    const setDone = (indexToUpdate)=>{
        const updatedTodos = todos.map((todo, i)=>(
            i === indexToUpdate ? {...todo, status: true} : todo
        ));

        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    const handleDelete = (index) =>{
        setDeleteIndex(index);
        setShowModal(true);
    }

    console.log(sorted);

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>
                            Status
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    sorted.map((todo, index)=>(
                        <tr key={index}>
                            <td>{todo.task}</td>
                            <td>{todo.description}</td>
                            <td>{todo.date}</td>
                            <td>{<Status status={todo.status}/>}</td>
                            <td className="controls">
                                <button onClick={()=>handleDelete(index)} className='delete'>Delete</button>
                                {(!todo.status) ? <button onClick={()=>setDone(index)} className = "done">Done!</button> : ''}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            {
                showModal && 
                <DeleteModal
                    onCancel={()=>setShowModal(false)}
                    onDelete={()=>{deleteRow(deleteIndex); setShowModal(false)}}
                />
            }
        </>
        
    )
}

export default TodoTable;