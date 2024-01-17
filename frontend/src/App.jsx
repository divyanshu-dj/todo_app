import { useEffect, useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/todos")
            .then(async (res) => {
                const data = await res.json();
                setTodos(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleTodoAdd = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };
      

    return (
        <div>
            <CreateTodo onTodoAdd={handleTodoAdd} />
            <Todos todos={todos} setTodos={setTodos} />
        </div>
    );
}

export default App;
