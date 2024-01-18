import React, { useState } from "react";
const Todos = ({ todos, setTodos }) => {
    
    const handleToggleComplete = async (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo._id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
        try {
            // Perform validation if needed

            const response = await fetch("http://localhost:3000/completed", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to create todo: ${response.status} ${response.statusText}`
                );
            }

            // Optionally handle the response from the backend
            const updatedToDo = await response.json();
        } catch (error) {
            console.error(error);
            // Handle the error if needed
        }
    };

    return ( 
        <div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <button onClick={() => { handleToggleComplete(todo._id)}}>
                        {todo.completed === true
                            ? "Completed"
                            : "Mark as complete"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Todos;
