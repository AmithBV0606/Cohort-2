import { createContext } from "react";

const countContext = createContext({
    count: 0, 
    setCount: () => {},
}); // Teleporter

export default countContext;