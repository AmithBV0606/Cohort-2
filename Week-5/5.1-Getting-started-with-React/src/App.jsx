import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([{
    title:"Gym",
    description:"Go to gym by 9am",
    completed: false
  }, {
    title:"DSA",
    description:"Do DSA for 2hrs",
    completed: true
  }]);

  // console.log(setCount)
  function handleClick() {
    setTodos([...todos, {
      title: "New Todo",
      description: "Add a new todo", 
      completed: true
    }])
  }

  // Anytime parent re-renders it's children also re-renders
  return (
    <div>
      <button onClick={handleClick}>Add Todos</button>
      {todos.map((todo, index) => {
        return(
          <div key={index}>
            <h3>{todo.title}</h3>
            <b>{todo.description}</b>
            <p>Completed : {todo.completed ? "Done": "Not completed"}</p>
          </div>
        );
      })}
    </div>
  )
}

export default App;