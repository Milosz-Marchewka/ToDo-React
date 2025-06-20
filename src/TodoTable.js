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
    const [isSortedByDueDate, setIsSortedByDueDate] = useState(false);
    const [isSortedByCreateDate, setIsSortedByCreateDate] = useState(false);
    const [isSortedByStatus, setIsSortedByStatus] = useState(false);
    const sortSvgs = {
        up: <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 15L12 10L17 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
        down: <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    }

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
    const handleSortByDueDate = ()=>{
        let updatedTodos;
        if(!isSortedByDueDate){
            updatedTodos = [...todos].sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
            setIsSortedByDueDate(true);
            setIsSortedByCreateDate(false);
            setIsSortedByStatus(false);
        } else {
            updatedTodos = [...todos].reverse();
            setIsSortedByDueDate(false);
            setIsSortedByCreateDate(false);
            setIsSortedByStatus(false);
        }
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    const handleSortByCreateDate = ()=>{
        let updatedTodos;
        if(!isSortedByCreateDate){
            updatedTodos = [...todos].sort((a,b)=>new Date(a.date)-new Date(b.date));
            setIsSortedByCreateDate(true);
            setIsSortedByDueDate(false);
            setIsSortedByStatus(false);
        } else {
            updatedTodos = [...todos].reverse();
            setIsSortedByCreateDate(false);
            setIsSortedByDueDate(false);
            setIsSortedByStatus(false);
        }
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    const handleSortByStatus = ()=>{
        let updatedTodos;
        if(!isSortedByStatus){
            updatedTodos = [...todos].sort((a,b)=>a.status-b.status);
            setIsSortedByStatus(true);
            setIsSortedByDueDate(false);
            setIsSortedByCreateDate(false);
        } else {
            updatedTodos = [...todos].reverse();
            setIsSortedByStatus(true);
            setIsSortedByDueDate(false);
            setIsSortedByCreateDate(false);
        }
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    return(
        (todos.length > 0) && 
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description</th>
                            <th>
                                <div className="sortTh">
                                    <button className="sortBtn" onClick={handleSortByDueDate}>Due date</button>
                                    {isSortedByDueDate ? sortSvgs.up : sortSvgs.down}
                                </div>
                            </th>
                            <th>
                                <div className="sortTh">
                                    <button className="sortBtn" onClick={handleSortByCreateDate}>Date created</button>
                                    {isSortedByCreateDate ? sortSvgs.up : sortSvgs.down}
                                </div>
                            </th>
                            <th>
                                <div className="sortTh">
                                    <button className="sortBtn" onClick={handleSortByStatus}>Status</button>
                                    {isSortedByStatus ? sortSvgs.up : sortSvgs.down}
                                </div>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        todos.map((todo, index)=>(
                            <tr key={index}>
                                <td>{todo.task}</td>
                                <td>{todo.description}</td>
                                <td>{new Date(todo.dueDate).toLocaleString().slice(0,-3)}</td>
                                <td>{new Date(todo.date).toLocaleString().slice(0,-3)}</td>
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