import React from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import StickyBookNow from "../../component/StickyBookNow";
import Contactbody from "./Contactbody";
import "./contact.css";
function ContactPage() {
  // State variables to store form data

  return (
    <>
      <Nav />
      <Contactbody />
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default ContactPage;
