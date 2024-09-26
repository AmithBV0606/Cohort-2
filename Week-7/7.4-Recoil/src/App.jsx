import { useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import countAtom from "./store/atoms/count";
import evenSelector from "./store/atoms/selectors";

function App() {
  return (
    <div>
      <Count />
    </div>
  );
}

function Count() {
  console.log("Count re-rendered!!");

  return (
    <div>
      <CountRenderer />
      <Buttons />
      <OddEven />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function Buttons() {
  // const [count, setCount] = useRecoilState(countAtom);
  // console.log("Button component re-rendered!!");

  // Problem : 
  // Since <Buttons /> component is re-rendering we can use "useSetRecoilState" instead of using "useRecoilState".

  // Solution 
  const setCount = useSetRecoilState(countAtom);
  console.log("Button component re-rendered!!");
  return (
    <div>
      <button
        onClick={() => {
          setCount(prevCount => prevCount - 1);
        }}
      >
        Decrease
      </button>

      <button
        onClick={() => {
          setCount(prevCount => prevCount + 1);
        }}
      >
        Increase
      </button>
    </div>
  );
}

function OddEven() {
  // const count = useRecoilValue(countAtom);

  // const isEven = useMemo(() => {
  //   return count % 2 === 0;
  // }, [count]);

  // Better way : If you want to apply this approach using Recoil, we have selectors.

  // Whatever the optimization we get by using useMemo, is what Recoil is goinng to give you.

  // Using Recoil selectors :
  const isEven = useRecoilValue(evenSelector);

  return(
    <div>
      {/* <p>Count is {count % 2 === 0 ? "Even" : "Odd"}</p> */}
      <p>{isEven ? "It is Even" : null}</p>
    </div>
  );
}

export default App;