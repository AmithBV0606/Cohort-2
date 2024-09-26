import { selector } from "recoil";
import countAtom from "./count";

const evenSelector = selector({
    key:"evenSelector",
    get: ({get}) => {
        // Describing how evenSelector is dependent on countAtom
        const count = get(countAtom); // This is like the dependency in the useMemo
        return count % 2 === 0;
    }
});

// In the get function we'll have access to various atoms and can return a state

export default evenSelector;