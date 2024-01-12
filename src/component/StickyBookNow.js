import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/stickybooknow.css";
function StickyBookNow() {
  return (
    <>
      <Link to="/">
        <div className="sticky-booknow">Get a Free Quote</div>
      </Link>
    </>
  );
}

export default StickyBookNow;
