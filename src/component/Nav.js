import React, { useState } from "react";
import "../assets/styles/Nav.css";
import { NavLink } from "react-router-dom";
function Nav() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <>
      <header className="navbar" id="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            <img src="/images/logo2.png" alt="logo" />
          </a>
        </div>
        <input
          type="checkbox"
          id="navbar-toggle"
          className="navbar-toggle"
          checked={isNavbarOpen}
          onChange={toggleNavbar}
        />

        <label htmlFor="navbar-toggle" className="toggle-btn">
          {isNavbarOpen ? <>|||</> : <>&#9776;</>}
        </label>

        <div className={`navbar-right ${isNavbarOpen ? "open" : " "}`}>
          <NavLink to="/" className="nav-link">
            HOME
          </NavLink>
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
