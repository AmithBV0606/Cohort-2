import { useState } from "react"
import Count from "./components/Count"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Count count={count} setCount={setCount}/>
    </div>
  )
}

export default App