import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  async function fetchData() {
    const response = await fetch(`http://localhost:8000/todos`);
    const data = await response.json();
    setTodos(data.todos);
  }

  useEffect(() => {
    // Cannot make useEffect an async function
    fetchData();
  }, []);

  return (
    <div className="card">
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="innerCard">
            <h1>{todo.id}</h1>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button>{todo.completed ? "Completed" : "Mark as done"}</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;