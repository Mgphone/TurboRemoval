import React, { useState } from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import StickyBookNow from "../../component/StickyBookNow";
import ContactPopup from "./ContactPopup";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaComments } from "react-icons/fa";
import "./Contact.css";

function ContactPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <Nav />
      <div className="modern-contact-page">
        <div className="contact-hero">
          <div className="contact-hero-content">
            <h1>Get In Touch With Turbo Removals</h1>
            <p>Professional moving services across London and surrounding areas. We're here to make your move stress-free.</p>
          </div>
        </div>

        <div className="contact-main-content">
          <div className="contact-info-section">
            <div className="contact-info-card">
              <FaPhone className="contact-card-icon" />
              <h3>Call Us</h3>
              <p>Ready to help with your moving needs</p>
              <a href="tel:+07578722677" className="contact-link">07578722677</a>
            </div>

            <div className="contact-info-card">
              <FaEnvelope className="contact-card-icon" />
              <h3>Email Us</h3>
              <p>Send us your questions anytime</p>
              <a href="mailto:info@turboremovals.co.uk" className="contact-link">info@turboremovals.co.uk</a>
            </div>

            <div className="contact-info-card">
              <FaMapMarkerAlt className="contact-card-icon" />
              <h3>Service Area</h3>
              <p>Professional moving services</p>
              <span className="contact-text">London & Surrounding Areas</span>
            </div>

            <div className="contact-info-card">
              <FaClock className="contact-card-icon" />
              <h3>Business Hours</h3>
              <p>We're available when you need us</p>
              <span className="contact-text">Mon-Sun: 7:00 AM - 9:00 PM</span>
            </div>
          </div>

          <div className="contact-cta-section">
            <div className="contact-cta-content">
              <h2>Need to Get in Touch?</h2>
              <p>Whether you need a quote, have questions about our services, or want to schedule a consultation, we're here to help. Click below to send us a message.</p>
              
              <button onClick={openPopup} className="contact-popup-btn">
                <FaComments className="btn-icon" />
                Send Us a Message
              </button>

              <div className="contact-features">
                <div className="contact-feature">
                  <span className="feature-check">✓</span>
                  <span>Quick Response</span>
                </div>
                <div className="contact-feature">
                  <span className="feature-check">✓</span>
                  <span>Free Quotes</span>
                </div>
                <div className="contact-feature">
                  <span className="feature-check">✓</span>
                  <span>Professional Service</span>
                </div>
              </div>
            </div>

            <div className="contact-image">
              <div className="contact-placeholder-image">
                <FaComments size={80} />
                <p>Professional Moving Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && <ContactPopup isOpen={isPopupOpen} onClose={closePopup} />}
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default ContactPage;
