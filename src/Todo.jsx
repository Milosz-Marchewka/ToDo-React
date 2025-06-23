import TodoForm from "./TodoForm"
import TodoTable from "./TodoTable";
import ClearLocal from "./ClearLocal";
import ThemeSwitch from "./ThemeSwitch";
import { darkMode } from "./theme";
import "./Todo.css";
import { useEffect, useState} from "react";

function Todo(){
    const [todos, setTodos] = useState(()=>{
        return JSON.parse(localStorage.getItem("todos")) ?? [];
    });
    const [theme, setTheme] = useState(darkMode);
    useEffect(()=>{
        document.body.className="";
        document.body.classList.add(theme.name);
    },[theme]);

    const addTodo = (newTodo) => {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    return(
        <>
            <div className="todo" style={{backgroundColor: theme.background, color:theme.text}}>
                <h1>To-do List</h1>
                <TodoForm theme={theme} addTodo={addTodo}/>
                <TodoTable theme={theme} todos={todos} setTodos={setTodos}/>
                <ClearLocal theme={theme} todos={todos} setTodos={setTodos}/>
            </div>
            <ThemeSwitch theme={theme} setTheme={setTheme}/>
        </>
    )
}

export default Todo;