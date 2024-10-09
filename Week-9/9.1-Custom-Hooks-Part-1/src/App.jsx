import { useState, useEffect } from 'react'
import './App.css'
import useMousePointer from './hooks/useMousePointer';

// Unmounting a component conditionally

function App() {
  const [render, setRender] = useState(true);

  // Custom Hook
  const mousePointer = useMousePointer();

  useEffect(() => {
    setTimeout(() => {
      setRender(false);
    }, 5000);
  }, []);

  return (
    <>
      {render ? <MyCompononet /> : <div>MyComponent unmounted</div>}
      <div>
        Cursor Co-ordinates are X : {mousePointer.x} and Y : {mousePointer.y}
      </div>
    </>
  )
}

function MyCompononet() {
  useEffect(() => {
    // console.log("Component mounted!")
    console.error("Component mounted!")
  
    return () => {
      console.log("Component Unmounted!")
    }
  }, [])
  
  return(
    <div>
      Hello from inside MyComponent
    </div>
  );
}

export default App;