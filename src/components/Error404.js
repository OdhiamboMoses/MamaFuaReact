import React, { useState } from "react";
import "./Error404.css";

function Error404() {
  const [names, setName] = useState(["Moses", "Jane", "Ken"]);

  const dis = names.map((name, i) => {
    return <li key={i}>{name}</li>;
  });

  function removeLastName() {
    setName((oldList) => {
      const newList = [...oldList];
      newList.pop();
      return newList;
    });
  }

  return (
    <>
      <div className="error">
        <h2>Error 404</h2>
        <p>Page does not Exist</p>
      </div>
      <button onClick={removeLastName}>Click Me</button>
      <div className="display">
        <ul>{dis}</ul>
      </div>
    </>
  );
}

export default Error404;
