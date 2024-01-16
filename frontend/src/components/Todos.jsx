import React from 'react'

const Todos = ({todos}) => {
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
          <button>{todo.complete == true ? "Completed" : "Mark as complete"}</button>
        </div>
      ))}
    </div>
  )
}

export default Todos
