import React from "react";
import "../assets/styles/Nav.css";
import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <>
      <header className="navbar" id="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            <img src="/images/logo2.png" alt="logo" />
          </a>
        </div>
        <div className="navbar-right">
          <NavLink to="/">HOME</NavLink>
          {/* <NavLink to="/about">ABOUT</NavLink> */}
          <NavLink to="/services">SERVICES</NavLink>
          <NavLink to="/locations">LOCATIONS</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
        </div>
      </header>
    </>
  );
}

export default Nav;
