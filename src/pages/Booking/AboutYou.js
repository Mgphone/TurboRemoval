import React from "react";

function AboutYou() {
  return (
    <>
      <div className="aboutyou">
        <div className="aboutyou-header">
          <h1>About you</h1>
          <p>
            We ask for your details so that we can send you a text with a link
            to your quotes. When you book we'll send a confirmation email and
            pass your name, email address and phone number to the driver you
            choose.
          </p>
        </div>
        <div className="aboutyou-info">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="name" />
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="email" />
          <label htmlFor="phonenumber">Phone</label>
          <input type="text" placeholder="phone" />
        </div>
      </div>
    </>
  );
}

export default AboutYou;
