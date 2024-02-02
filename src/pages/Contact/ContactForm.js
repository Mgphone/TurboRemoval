import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
function ContactForm() {
  const [formData, setFormData] = useState(null);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    title: Yup.string().required("Title is required"),
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
    onSubmit: (values) => {
      handleSubmit(values);
      setFormData(values);
    },
  });
  const handleSubmit = (values) => {
    console.log("Form Submitted", formData);
  };

  return (
    <div className="contact-right">
      <h2>SEND A MESSAGE</h2>
      <p>We won't share your email. Just fill in the necessary fields.</p>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Your Name*"
            // required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="contact-form-error">{formik.errors.name}</div>
          ) : null}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Your Email"
            // required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="contact-form-error">{formik.errors.email}</div>
          ) : null}
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Your Phone*"
            // required
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            // required
            placeholder="Title"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="contact-form-error">{formik.errors.title}</div>
          ) : null}
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            // required
            placeholder="Message*"
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="contact-form-error">{formik.errors.message}</div>
          ) : null}
        </label>

        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formik.values.agree}
            onChange={formik.handleChange}
            // required
          />
          {formik.touched.agree && formik.errors.agree ? (
            <div className="contact-form-error">{formik.errors.agree}</div>
          ) : null}
          Please mark this checkbox to confirm your agreement to the utilization
          of your data in compliance with our Privacy Policy.
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
