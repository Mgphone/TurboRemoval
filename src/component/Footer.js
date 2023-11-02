import React from "react";
import "../assets/styles/Footer.css";
function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        <div className="contact">
          <p>Phone: 123-456-7890 </p>
          <p> Email: info@yourcompany.com </p>
          <p> Address: 123 Main St, London, Postcode</p>
        </div>
        <div className="copyright">
          <p> Copyright © {year} Lifting London</p>
        </div>
        <div className="quotetop">
          <p>Get a Quick Quote</p>
          <p>Up to Top</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
