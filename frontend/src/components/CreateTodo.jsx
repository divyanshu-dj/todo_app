import React from "react";
import { useState, useEffect } from "react";

const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // const handleAddTodo = () => {
    //     useEffect(() => {
    //         fetch("http://localhost:3000/todos", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 title: title,
    //                 description: description,
    //             }),
    //         })
    //             .then(async (res) => {
    //                 const data = await res.json();
    //                 alert(`You added a todo: ${data.title}`)
    //             })
    //             .catch((err) => console.log(err));
    //     }, [title, description, handleAddTodo])
    // };
    const handleAddTodo = async () => {
        try {
          // Perform validation if needed
    
          const response = await fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              description,
            }),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to create todo: ${response.status} ${response.statusText}`);
          }
    
          // Optionally handle the response from the backend
          const createdTodo = await response.json();
    
          // Optionally update the local state with the newly created todo
          if (onTodoAdd) {
            onTodoAdd(createdTodo);
          }
    
          // Clear the input fields
          setTitle('');
          setDescription('');
        } catch (error) {
          console.error(error);
          // Handle the error if needed
        }
      };
    return (
        <div>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleAddTodo}>Create Todo</button>
        </div>
    );
};

export default CreateTodo;
