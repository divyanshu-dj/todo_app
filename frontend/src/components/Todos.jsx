import React from 'react';

const Todos = ({ todos, setTodos }) => {
  const handleToggleComplete = (id) => {
    console.log('Clicked todo ID:', id);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.id}</h1>
          {console.log(todo.id)}
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
          <button onClick={() => handleToggleComplete(todo.id)}>
            {todo.completed === true ? 'Completed' : 'Mark as complete'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
