import { useEffect } from "react";
import "./TodoTable.css";

function TodoTable({todos, setTodos}){

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

    const sorted = [...todos].sort((a,b)=>a.status-b.status);

    return(
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
                        <td>{todo.status ? "Done" : "Not done"}</td>
                        <td className="controls">
                            <button onClick={()=>deleteRow(index)} className='delete'>Delete</button>
                            {(!todo.status) ? <button onClick={()=>setDone(index)} className = "done">Done!</button> : ''}
                        </td>
                    </tr>
                   ))
                }
            </tbody>
        </table>
    )
}

export default TodoTable;