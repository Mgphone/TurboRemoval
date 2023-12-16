import React from "react";
import "../assets/styles/Nav.css";
import { Link, NavLink, useLocation } from "react-router-dom";
function Nav() {
  // const location = useLocation();

  // const isButtonVisible = location.pathname !== "/booking/*";
  const location = useLocation();
  // const isBookingPage = location.pathname.startsWith("/booking");
  // const searchParams = new URLSearchParams(location.search);
  // const isLocationInQuery = searchParams.has("yourlocation");
  // const isButtonVisible = !(isBookingPage || isLocationInQuery);
  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            <img src="/images/logo2.png" alt="logo" />
          </a>
        </div>
        <div className="navbar-right">
          {/* {isButtonVisible && (
            <div className="top-section">
              <Link to="/booking">
                <div>Get FREE QUOTE</div>
              </Link>
            </div>
          )} */}
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
