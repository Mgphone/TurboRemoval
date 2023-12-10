import React, { useState } from "react";
import "./About.css";
import Nav from "../../component/Nav";
function About() {
  const [count, setCount] = useState(0);
  const handleretrieve = async () => {
    // console.log("You Click Retrieve Button");
    fetch("/retrieve")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log(JSON.stringify(data)))
      .catch((error) => console.error("Fetch error:", error));
  };
  const handleClick = (param) => {
    // console.log(`You Clicked ${param}`);

    fetch("/retrieve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ param: param }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response", data);
      })
      .catch((error) => console.log("Error sendting to server", error));
  };
  const handleCount = () => {
    setCount(count + 1);
    fetch("/retrieve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: count }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Server Response in ${count}", data))
      .catch((error) => console.log("Error sendting to server", error));
  };
  const handleReset = () => {
    setCount(0);
  };
  return (
    <>
      <Nav />
      <div>
        About Page
        <button className="recallquote" onClick={handleretrieve}>
          Retrieve Quote
        </button>
        <button onClick={() => handleClick("Button1")}>Button2</button>
        <button onClick={() => handleClick("Button2")}>Button2</button>
        <div>
          <p>{count}</p>
          <button onClick={handleCount}>Plus</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default About;
