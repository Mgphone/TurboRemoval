import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./ContactPopup.css";

function ContactPopup({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Need at least 3 characters")
      .required("Name is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    title: Yup.string().required("Title is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
    message: Yup.string().required("Message is required"),
    agree: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      title: "",
      message: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}contact/sendemail`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          setSubmitSuccess(true);
          resetForm();
          setTimeout(() => {
            setSubmitSuccess(false);
            onClose();
          }, 2000);
        } else {
          throw new Error(`Response error:${response.status}`);
        }
      } catch (error) {
        console.error("Cannot Connect to Server", error);
        alert("An unexpected error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="contact-popup-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="contact-popup-content">
          <div className="contact-popup-left">
            <h2>Get In Touch</h2>
            <p className="contact-popup-subtitle">
              We'd love to hear from you. Get in touch with Turbo Removals for all your moving needs.
            </p>

            <div className="contact-info-items">
              <div className="contact-info-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h4>Call Us</h4>
                  <a href="tel:+07578722677">07578722677</a>
                </div>
              </div>

              <div className="contact-info-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email Us</h4>
                  <a href="mailto:info@turboremovals.co.uk">info@turboremovals.co.uk</a>
                </div>
              </div>

              <div className="contact-info-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Service Area</h4>
                  <p>London & Surrounding Areas</p>
                </div>
              </div>

              <div className="contact-info-item">
                <FaClock className="contact-icon" />
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon-Sun: 7:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-popup-right">
            <h3>Send us a Message</h3>
            
            {submitSuccess ? (
              <div className="success-message">
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="contact-popup-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      placeholder="Your Name*"
                      className={formik.touched.name && formik.errors.name ? 'error' : ''}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="error-message">{formik.errors.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      placeholder="Your Email*"
                      className={formik.touched.email && formik.errors.email ? 'error' : ''}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="error-message">{formik.errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      placeholder="Your Phone*"
                      className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="error-message">{formik.errors.phone}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      placeholder="Subject*"
                      className={formik.touched.title && formik.errors.title ? 'error' : ''}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="error-message">{formik.errors.title}</div>
                    )}
                  </div>
                </div>

                <div className="form-group full-width">
                  <textarea
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    placeholder="Your Message*"
                    rows="4"
                    className={formik.touched.message && formik.errors.message ? 'error' : ''}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="error-message">{formik.errors.message}</div>
                  )}
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formik.values.agree}
                      onChange={formik.handleChange}
                    />
                    <span className="checkmark"></span>
                    I agree to the <a href="/privacy" target="_blank">Privacy Policy</a> and Terms of Service
                  </label>
                  {formik.touched.agree && formik.errors.agree && (
                    <div className="error-message">{formik.errors.agree}</div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPopup;