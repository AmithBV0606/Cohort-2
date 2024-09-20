import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

const nums = [1,2,3,4,5];

function App() {
  const [inputNum, setInputNum] = useState(1);

  return (
    <div>
      {/* <input 
        type="text" 
        onChange={(e) => setInputNum(e.target.value)} 
        style={{
          marginBottom:"20px",
        }}
      /> */}

      {nums.map((num) => (
        <button
          onClick={(e) => setInputNum(num)}
        >{num}</button>
      ))}

      <Todo Id={inputNum}/>
    </div>

  );
}

export default App;