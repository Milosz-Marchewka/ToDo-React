import TodoForm from "./TodoForm"
import TodoTable from "./TodoTable";
import ClearLocal from "./ClearLocal";
import "./Todo.css";
import { useState } from "react";

function Todo(){
    const [todos, setTodos] = useState(()=>{
        return JSON.parse(localStorage.getItem("todos")) ?? [];
    });

    const addTodo = (newTodo) => {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }


    return(
        <>
            <h1>To-do List</h1>
            <TodoForm addTodo={addTodo}/>
            <TodoTable todos={todos} setTodos={setTodos}/>
            <ClearLocal todos={todos} setTodos={setTodos}/>
        </>
    )
}

export default Todo;