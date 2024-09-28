import { atomFamily } from "recoil";
import { TODOS } from "./todos";

export const todosAtomFamily = atomFamily({
    key:"todoAtomFamily",
    default: (id) => {
        return TODOS.find((x) => x.id === id)
    }
}) ;

// If a same id is passed as input, the find method will only run once and and caches the value