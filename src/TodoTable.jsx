import "./TodoTable.css";
import DeleteModal from "./DeleteModal";
import Status from "./Status";
import Edit from "./Edit";
import Filters from "./Filters";
import { useEffect, useState } from "react";

function TodoTable({theme, todos, setTodos}){
    // indice variables
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [editIndex, setEditIndex] = useState(0);
    // edit and delete modal variables
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({task: "", priority:{high: true, medium: true, low: true}, status: {done: true, notdone: true}, dates:{upcoming: true, overdue: true}});
    // sorted variables
    const [isSortedByDueDate, setIsSortedByDueDate] = useState(false);
    const [isSortedByCreateDate, setIsSortedByCreateDate] = useState(false);
    const [isSortedByStatus, setIsSortedByStatus] = useState(false);
    // sorted via priority by default
    const [isSortedByPriority, setIsSortedByPriority] = useState(true);
    useEffect(()=>{
        const updatedTodos = [...todos].sort((a,b)=>a.priority-b.priority);
        updatedTodos.reverse();
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    },[]);    

    const priorityMap={
        0: "low",
        1: "medium",
        2: "high"
    }

    const svgs = {
        sort:{
            up: <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 15L12 10L17 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
            down: <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        },
        status:{
            done: <svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#00ff00"></circle> </g></svg>,
            notdone:<svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#ff0000"></circle> </g></svg>
        },
        priority:{
            2: <svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#e74c3c"></circle> </g></svg>,
            1: <svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#f1c40f"></circle> </g></svg>,
            0: <svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="8" r="8" fill="#2ecc71"></circle> </g></svg>
        }
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
            setIsSortedByPriority(false);
        } else {
            updatedTodos = [...todos].reverse();
            setIsSortedByDueDate(false);
            setIsSortedByCreateDate(false);
            setIsSortedByStatus(false);
            setIsSortedByPriority(false);
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
            setIsSortedByPriority(false);
        } else {
            updatedTodos = [...todos].reverse();
            setIsSortedByCreateDate(false);
            setIsSortedByDueDate(false);
            setIsSortedByStatus(false);
            setIsSortedByPriority(false);
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
            setIsSortedByPriority(false);
        } else {
            updatedTodos = [...todos].reverse();
            setIsSortedByStatus(false);
            setIsSortedByDueDate(false);
            setIsSortedByCreateDate(false);
            setIsSortedByPriority(false);
        }
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    const handleSortByPriority = ()=>{
        let updatedTodos;
        if(!isSortedByPriority){
            updatedTodos = [...todos].sort((a,b)=>a.priority-b.priority);
            setIsSortedByPriority(true);
            setIsSortedByStatus(false);
            setIsSortedByDueDate(false);
            setIsSortedByCreateDate(false);
        } else {
            updatedTodos = [...todos].reverse();
            setIsSortedByPriority(false);
            setIsSortedByStatus(false);
            setIsSortedByDueDate(false);
            setIsSortedByCreateDate(false);
        }
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    const handleFilters = ()=>{
        setShowFilters(!showFilters);
    }

    console.log(todos);
    return(
        (todos.length > 0) && 
            <>
                <table>
                    <thead>
                        <tr style={{backgroundColor: theme.th}}>
                            <th>Task</th>
                            <th>Description</th>
                            <th>
                                <div className="sortTh">
                                    <button style={{color: theme.text}} className="sortBtn" onClick={handleSortByDueDate}>Due date</button>
                                    {isSortedByDueDate ? svgs.sort.up : svgs.sort.down}
                                </div>
                            </th>
                            <th>
                                <div className="sortTh">
                                    <button style={{color: theme.text}} className="sortBtn" onClick={handleSortByCreateDate}>Date created</button>
                                    {isSortedByCreateDate ? svgs.sort.up : svgs.sort.down}
                                </div>
                            </th>
                            <th>
                                <div className="sortTh">
                                    <button style={{color: theme.text}} className="sortBtn" onClick={handleSortByPriority}>Priority</button>
                                    {isSortedByPriority ? svgs.sort.up : svgs.sort.down}
                                </div>
                            </th>
                            <th>
                                <div className="sortTh">
                                    <button style={{color: theme.text}} className="sortBtn" onClick={handleSortByStatus}>Status</button>
                                    {isSortedByStatus ? svgs.sort.up : svgs.sort.down}
                                </div>
                            </th>
                            <th>
                                <button onClick={handleFilters}><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12L16 12M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19L20 19M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke-width="1.5" stroke-linecap="round" style={{stroke: theme.text}}></path> </g></svg></button>
                                { showFilters && 
                                    <Filters
                                        theme={theme}
                                        filters={filters}
                                        setFilters={setFilters}
                                    />
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor: theme.secondary}}>
                        {
                        todos
                            .filter(todo=>{
                                // todo.priority
                                const priority = filters.priority[(priorityMap[todo.priority])];

                                // todo.status
                                const status = 
                                    (todo.status && filters.status.done) || (!todo.status && filters.status.notdone);

                                // todo.dueDate
                                const dueDate = new Date(todo.dueDate);
                                const now = new Date();

                                const isUpcoming = dueDate > now;
                                const isOverdue = dueDate < now;

                                const date = (filters.dates.upcoming && filters.dates.overdue) ? true : (filters.dates.upcoming && isUpcoming) || (filters.dates.overdue && isOverdue);

                                // todo.task
                                const title = todo.task.includes(filters.task);

                                return status && date && title && priority;
                            })
                            .map((todo, index)=>(
                            <tr key={index}>
                                <td>{todo.task}</td>
                                <td>{todo.description}</td>
                                <td>{new Date(todo.dueDate).toLocaleString().slice(0,-3)}</td>
                                <td>{new Date(todo.date).toLocaleString().slice(0,-3)}</td>
                                <td>{<Status svg={svgs.priority[todo.priority]} msg={priorityMap[todo.priority]} />}</td>
                                <td>{<Status svg={todo.status ? svgs.status.done : svgs.status.notdone} msg={todo.status ? "Done" : "Not done"}/>}</td>
                                <td className="controls">
                                    {(!todo.status) ? <button style={{backgroundColor: theme.buttons.add}} onClick={()=>setDone(index)} className = "done">Done!</button> : ''}
                                    <button style={{backgroundColor: theme.buttons.edit}} onClick={()=>handleEdit(index)} className="edit">Edit</button>
                                    <button style={{backgroundColor: theme.buttons.delete}} onClick={()=>handleDelete(index)} className='delete'>Delete</button>
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