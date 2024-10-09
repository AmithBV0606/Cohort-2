# Custom Hooks

### Types of Custom Hooks :

1. Data fetching hooks
2. Browser functionality related hooks
3. Performance/Timer based

## 1) Data fetching hooks

#### Data fetching hooks can be used to encapsulate all the logic to fetch the data from your backend

```javascript
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
    });
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <Track todo={todo} />
      ))}
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default App;
```

## Creating our own(custom) Hook :

### Step 1 : Converting the data fetching bit to a custom hook

```javascript
function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
    });
  }, []);

  return todos;
}
```

### Step 2 - Cleaning the hook to include a loading parameter

What if you want to show a loader when the data is not yet fetched from the backend?

```javascript
function useTodos() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });
  }, []);

  return {
    todos: todos,
    loading: loading,
  };
}
```

### Step 3 - Auto refreshing hook

What if you want to keep polling the backend every n seconds? n needs to be passed in as an input to the hook

```javascript
function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const value = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      });
    }, n * 1000);

    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });

    return () => {
      clearInterval(value);
    };
  }, [n]);

  return { todos, loading };
}
```

**NOTE :** When used any state management library, we mostly don't require any custom hooks.

## 2) Browser functionality related hooks

- **useIsOnline hook** : Create a hook that returns true or false based on weather the user is currently online

```javascript
function useIsOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
  }, []);
}
```

- **useMousePointer hook** : Create a hook that returns you the current mouse pointer position.

```javascript
import { useEffect, useState } from 'react'

const useMousePointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

function App() {
  const mousePointer = useMousePointer();

  return (
    <>
      Your mouse position is {mousePointer.x} {mousePointer.y}
    </>
  )
}

export default App  
```

- **useDimension hook** : Create a hook to measure the height and width of the screen

## 3. Performance/Timer based

- **useInterval hook** : Create a hook that runs a certain callback function every n seconds.

```javascript
function useInterval(fn, timer) {
    useEffect(() => {
        const intervalId = setInterval(fn, timer);

        return () => {
            clearInterval(intervalId);
        }
    }, [fn, timer])
}

export default useInterval;
```

#### Usage of useInterval hook : 
```javascript
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(c => c + 1);
  }, 1000)

  return (
    <>
      Timer is at {count}
    </>
  )
}

export default App; 
```

- **useDebounce hook** : Create a hook that debounces a value given
 1) The value that needs to be debounced
 2) The interval at which the value should be debounced.

```javascript
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes before the delay has passed
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};
```