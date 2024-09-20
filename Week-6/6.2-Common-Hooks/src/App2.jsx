import React, { useMemo, useState } from "react";

function App2() {
  const [inputVal, setInputVal] = useState(0);
  const [count, setCount] = useState(0);

  const handleChange = useMemo(() => {
    // console.log("Memo got called");
    let sum = 0;
    for (let i = 1; i <= inputVal; i++) {
        sum += i;
    }
    return sum;
  }, [inputVal]);

  return (
    <div>
      <input 
            type="text" 
            onChange={(e) => setInputVal(parseInt(e.target.value))}    
        />

      <p>Sum is {handleChange}</p>

      <button onClick={() => setCount(count + 1)}>Counter {count}</button>
    </div>
  );
}

export default App2;