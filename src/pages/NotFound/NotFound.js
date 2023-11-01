import React from "react";
import Nav from "../../component/Nav";
import "./NotFound.css";
function NotFound() {
  return (
    <>
      <Nav />
      <div className="notfound">
        <h1>404 - Not Found</h1>
        <br />
        <p>The page you're looking for does not exist.</p>
      </div>
    </>
  );
}

export default NotFound;
