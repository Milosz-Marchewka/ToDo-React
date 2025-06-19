import "./TodoTable.css";
import DeleteModal from "./DeleteModal";
import Status from "./Status";
import Edit from "./Edit";
import { useState } from "react";

function TodoTable({todos, setTodos}){
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [editIndex, setEditIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const sorted = [...todos].sort((a,b)=>a.status-b.status);

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
    const handleEdit = (index)=>{
        setEditIndex(index);
        setShowEdit(true);
    }

    return(
        (todos.length > 0) && 
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
                                <td>{new Date(todo.date).toUTCString()}</td>
                                <td>{<Status status={todo.status}/>}</td>
                                <td className="controls">
                                    {(!todo.status) ? <button onClick={()=>setDone(index)} className = "done">Done!</button> : ''}
                                    <button onClick={()=>handleEdit(index)} className="edit">Edit</button>
                                    <button onClick={()=>handleDelete(index)} className='delete'>Delete</button>
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
                {
                    showEdit && 
                    <Edit
                        todos = {todos}
                        editIndex = {editIndex}
                        setTodos = {setTodos}
                        onCancel={()=>setShowEdit(false)}
                        closeModal={()=>{setShowEdit(false)}}
                    />
                }
            </>   
    )
}

export default TodoTable;