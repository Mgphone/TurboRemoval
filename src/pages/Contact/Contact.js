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
          Thank you for reaching out to <strong>Lifting London</strong>. You can
          contact us using the form below, or by phone or email.
        </p>

        <h2>Contact Information</h2>

        <p>
          <strong>Phone:</strong> <a href="tel:+123456789">+123 456 789</a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:info@yourcompany.com">info@yourcompany.com</a>
        </p>

        <p>
          We appreciate your interest in <strong>Lifting London</strong> and
          will get back to you as soon as possible.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
