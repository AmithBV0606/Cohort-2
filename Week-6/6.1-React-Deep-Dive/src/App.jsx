import React, {Fragment, useState} from "react"
import Header from "./components/Header"
import HeaderWithButton from "./components/HeaderWithButton"
import CardWrapper from "./components/CardWrapper"
import TextComponent from "./components/TextComponent"

function App() {
  // const [firstTitle, setFirstTitle] = useState("my name is amith");

  // const handleClick = () => {
  //   const random = Math.random();
  //   setFirstTitle("My namer is " + random);
  // }

  return (
    <div>
      {/* <br /><br />
      <button onClick={handleClick}>Click me to change the title</button>
      <br /><br />
      <Header title={firstTitle} /> */}
      <HeaderWithButton />
      <Header title={"my name is raman"} />
      <Header title={"my name is sidvin"} />
      <Header title={"my name is varun"} />

      <CardWrapper innerComponent={<TextComponent />}/>
      <CardWrapper innerComponent={<Header title={"my name is varun"} />}/>
      <CardWrapper innerComponent={<TextComponent />}/>
    </div>
  )
}

export default App