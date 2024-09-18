import React, { useState } from "react";
import Header from "./Header";

function HeaderWithButton() {
  const [firstTitle, setFirstTitle] = useState("my name is amith");

  const handleClick = () => {
    const random = Math.random();
    setFirstTitle("My namer is " + random);
  };

  return (
    <div>
      <br />
      <br />
      <button onClick={handleClick}>Click me to change the title</button>
      <br />
      <br />
      <Header title={firstTitle} />
    </div>
  );
}

export default HeaderWithButton;