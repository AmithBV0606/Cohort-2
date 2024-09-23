import { useContext, useState } from "react";
import countContext from "./context";

function App() {
  const [count, setCount] = useState(0);

  // Wrap anyone who wants to use the teleported values inside a provider.
  return (
    <countContext.Provider value={{ count, setCount}}>
      <div>
        <Count />
      </div>
    </countContext.Provider>
  );
}

function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const { count } = useContext(countContext);

  return <div>{count}</div>;
}

function Buttons() {
  const { count, setCount } = useContext(countContext);
  
  return (
    <div>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>

      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>
    </div>
  );
}

export default App;