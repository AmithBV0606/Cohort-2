# Context API

    Context API allows data to be passed through a component tree without having to pass props manually at every level. This makes it easier to share data between components.

### Why was Context API introduced ?
    - Managing state is an essential part of developing applications in React. A common way to manage state is by passing props. 
    
    - Passing props means sending data from one component to another. It's a good way to make sure that data gets to the right place in a React application.

    - But it can be annoying to pass props when you have to send the same data to lots of components or when components are far away from each other. This can make an application slower and harder to work with.

    - Fortunately, React provides a built-in feature known as the context API that helps “teleport” data to the components that need it without passing props.

## Getting started with Context API :

### Step 1 : Create a Context Object
Create a new file named context.js in the src folder and add the following code to create a context object:
```javascript
import { createContext } from "react";

const countContext = createContext({
    count: 0, 
    setCount: () => {},
}); // Teleporter

export default countContext;
```

### Step 2 : Wrap Components with a Provider
```javascript
// Create a parent component that wraps child components with a Provider

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
```

### Step 3 :Consume the Context
```javascript
// Component 1
function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

// Child Component 1 
function CountRenderer() {
  const { count } = useContext(countContext);

  return <div>{count}</div>;
}

// Child Component 1 
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
```