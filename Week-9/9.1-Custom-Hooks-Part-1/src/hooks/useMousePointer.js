import { useEffect, useState } from "react";

function useMousePointer() {
    const [pointer, setPointer] = useState({
        x:0, 
        y:0
    });

    const handlePonter = (e) => {
        setPointer({
            x:e.clientX,
            y:e.clientY,
        });
    }

    useEffect(() => {
      window.addEventListener("mousemove", handlePonter);
    
      return () => {
        window.removeEventListener("mousemove", handlePonter);
      }
    }, []);
    
    return pointer;
}

export default useMousePointer;