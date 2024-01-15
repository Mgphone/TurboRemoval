import React from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import TermsBody from "./TermsBody";
import "./terms.css";
import StickyBookNow from "../../component/StickyBookNow";
function Terms() {
  return (
    <>
      <Nav />
      <TermsBody />
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default Terms;
