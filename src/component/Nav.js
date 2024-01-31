import React, { useState } from "react";
import "../assets/styles/Nav.css";
import { NavLink, useLocation } from "react-router-dom";
function Nav() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  const location = useLocation();
  // const locationPath = useLocation().pathname !== "/";
  const locationPath =
    location.pathname !== "/" && location.pathname !== "/booking";
  // console.log(locationPath);

  return (
    <>
      <header className="navbar" id="navbar">
        <div className="navbar-left">
          <NavLink to="/">
            <img src="/images/logo2.png" alt="logo" />
          </NavLink>

          <input
            type="checkbox"
            id="navbar-toggle"
            className="navbar-toggle"
            checked={isNavbarOpen}
            onChange={toggleNavbar}
          />

          <label htmlFor="navbar-toggle" className="toggle-btn">
            {isNavbarOpen ? <>X</> : <>&#9776;</>}
          </label>
        </div>
        {/* <div className={`navbar-right ${isNavbarOpen ? "open" : " "}`}> */}

        <div className={`${isNavbarOpen ? " " : "close"}`}>
          <nav>
            <NavLink to="/" className="nav-link">
              HOME
            </NavLink>
            <NavLink to="/services" className="nav-link">
              SERVICES
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              CONTACT
            </NavLink>
            <NavLink to="/faq" className="nav-link">
              FAQ
            </NavLink>
            {locationPath ? (
              <NavLink to="/" className="nav-link">
                BOOK NOW
              </NavLink>
            ) : (
              <div></div>
            )}
          </nav>
        </div>
      </header>

      {/* <header className="navbar" id="navbar">
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
          <NavLink to="/services">SERVICES</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </div>
      </header> */}
    </>
  );
}

export default Nav;
