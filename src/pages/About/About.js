import React from "react";
import "./About.css";
import Nav from "../../component/Nav";
function About() {
  const handleretrieve = async () => {
    // console.log("You Click Retrieve Button");
    fetch("/retrieve")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Fetch error:", error));
  };
  // const handleClick = () => {
  //   fetch("/retrieve", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   }).then((response) => response.json);
  // };
  return (
    <>
      <Nav />
      <div>
        About Page
        <button className="recallquote" onClick={handleretrieve}>
          Retrieve Quote
        </button>
        {/* <button onClick={handleClick}>Button 1</button>
        <button onClick={handleClick}>Button2</button> */}
      </div>
    </>
  );
}

export default About;
