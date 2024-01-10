import React from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";

function ContactPage() {
  // State variables to store form data

  return (
    <>
      <Nav />
      <div>
        <h1>Contact Us</h1>

        <p>
          Thank you for reaching out to <strong>Turbo Removals </strong>. You
          can contact us using the form below, or by phone or email.
        </p>

        <h2>Contact Information</h2>

        <p>
          <strong>Phone:</strong> <a href="tel:+07578722677 ">07578722677 </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto: info@turboremovals.co.uk">
            {" "}
            info@turboremovals.co.uk
          </a>
        </p>

        <p>
          We appreciate your interest in <strong>Turbo Removals</strong> and
          will get back to you as soon as possible.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
