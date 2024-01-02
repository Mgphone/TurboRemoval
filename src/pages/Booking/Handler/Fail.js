import React from "react";
import Footer from "../../../component/Footer";
import Nav from "../../../component/Nav";
import { FaTimesCircle } from "react-icons/fa";
import "./fail.css";
function Fail() {
  return (
    <>
      <Nav />
      <div className="failure-container">
        <h1 className="failure-heading">Payment Failed</h1>
        <p>Oops! Something went wrong during the payment process.</p>

        <div className="icon-container">
          <FaTimesCircle className="failure-icon" />
        </div>

        <p className="try-again">
          Please try again or contact customer support.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Fail;
