import React from "react";
import Nav from "../../component/Nav";
import "./NotFound.css";
import { Link } from "react-router-dom";
import Footer from "../../component/Footer";
function NotFound() {
  return (
    <div className="notfound">
      <h1>404 - Not Found</h1>
      <br />
      <p>The page you're looking for does not exist.</p>
      <button>
        <Link to="/">Go Back Home</Link>
      </button>
    </div>
  );
}

export default NotFound;
