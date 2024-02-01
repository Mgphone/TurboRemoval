import React from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import StickyBookNow from "../../component/StickyBookNow";
import Contactbody from "./Contactbody";
import "./Contact.css";
import ContactForm from "./ContactForm";
function ContactPage() {
  return (
    <>
      <Nav />
      <div className="contact-us">
        <Contactbody />
        <ContactForm />
      </div>
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default ContactPage;
