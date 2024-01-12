import React from "react";
import "../assets/styles/Footer.css";
import { FaPhone, FaEnvelope } from "react-icons/fa";

function Footer({ isHomePage }) {
  const year = new Date().getFullYear();
  const footerStyle = {
    paddingBottom: isHomePage ? "0" : "7vh",
  };
  return (
    <>
      <div className="footer" style={footerStyle}>
        <div className="contact">
          <p>
            <a href="tel:07578722677">
              {" "}
              Tel: <FaPhone />
            </a>
          </p>
          <p>
            <a href="mailto:info@turboremovals.com">
              Email: <FaEnvelope />
            </a>
          </p>
        </div>
        <div className="copyright">
          <p> Copyright © {year} Turbo Removals</p>
        </div>
        <div className="quotetop">
          <p>
            <a href="#quotesearch">Get a Quick Quote</a>
          </p>
          <p>
            <a href="#navbar">Up to Top</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
