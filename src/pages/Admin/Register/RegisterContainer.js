import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function RegisterContainer() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Need at least 3 characters")
      .required("Name is required"),
    uniquecode: Yup.string().required("Your uniqued code is Required"),
    password1: Yup.string().required("Password is Required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Password must match")
      .required("Password confirmation is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      password1: "",
      password2: "",
      uniquecode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      // setFormData(values);
    },
  });
  const handleSubmit = async (values) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}admin/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          alert(data.message);
          navigate("/login");
        } else if (data.errormessage) {
          // alert(data.errormessage);
          setErrorMessage(data.errormessage);
        }
      } else {
        throw new Error(`Response error: ${response.satus}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="register-container">
        <h1>Register User</h1>
        <div>
          <label htmlFor="Name" />
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="username"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="register-form-error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password" />
          <input
            type="password"
            name="password1"
            value={formik.values.password1}
            onChange={formik.handleChange}
            placeholder="password"
          />{" "}
          {formik.touched.password1 && formik.errors.password1 ? (
            <div className="register-form-error">{formik.errors.password1}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="repeat-password" />
          <input
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            type="password"
            placeholder="repeat-password"
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div className="register-form-error">{formik.errors.password2}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="youruniquecode" />
          <input
            name="uniquecode"
            value={formik.values.uniquecode}
            onChange={formik.handleChange}
            type="text"
            placeholder="Your Unique Code"
          />
          {formik.touched.uniquecode && formik.errors.uniquecode ? (
            <div className="register-form-error">
              {formik.errors.uniquecode}
            </div>
          ) : null}
          {errorMessage && (
            <div className="register-form-error">{errorMessage}</div>
          )}
        </div>
        <button className="register-button" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterContainer;
