import React, { useEffect, useState } from "react";
import axios from "axios";

function Todo({ Id }) {
  const [todo, setTodo] = useState([]);

  async function fetchData() {
    const response = await axios.get(`http://localhost:8000/todo/${Id}`);
    console.log(response.data.todo);
    setTodo(response.data.todo);
  }

  useEffect(() => {
    fetchData();
  }, [Id]);

  return (
    <div>
      <div className="card">
        {todo.map((t) => {
          return (
            <div key={t.id} className="innerCard">
              <h1>{t.id}</h1>
              <h2>{t.title}</h2>
              <p>{t.description}</p>
              <button>{t.completed ? "Completed" : "Mark as done"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;