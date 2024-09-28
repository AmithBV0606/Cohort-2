import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { todosAtomFamily } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  //  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
   const singleTodo = useRecoilValue(todosAtomFamily(id));

  return (
    <div>
      {singleTodo.title}
      <br />
      {singleTodo.description}
      <br /><br />
    </div>
  );
}

export default App;