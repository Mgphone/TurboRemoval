import React from "react";
import "../assets/styles/Nav.css";
import { Link, NavLink } from "react-router-dom";
function Nav() {
  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            <img src="/images/logo2.png" alt="logo" />
          </a>
        </div>
        <div className="navbar-right">
          <div className="top-section">
            <Link to="/booking">
              <div>Get FREE QUOTE</div>
            </Link>
          </div>
          <div className="bottom-section">
            {/* <a href="/">HOME</a> */}
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/services">SERVICES</NavLink>
            <NavLink to="/locations">LOCATIONS</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
          </div>
        </div>
      </header>
    </>
  );
}

export default Nav;
