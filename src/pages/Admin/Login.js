import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./admin.css";
function Login() {
  const [errormessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handlesignup = () => {
    navigate("/admin/register");
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Need at lease 3 Characters")
      .required("Usename Required"),
    password: Yup.string().required("Password Required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}account/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to Log in");
      }
      const data = await response.json();
      const { token } = data;
      localStorage.setItem("token", token);

      if (!data.success) {
        throw new Error(data.message || "Login unsuccessful");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login Error:", error.status);
      setErrorMessage(error.message || "Error Happen During login");
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="login-container">
        <h1>Admin Login</h1>
        <div>
          <label htmlFor="Name" />
          <input
            type="text"
            placeholder="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="register-form-error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password" />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="register-form-error">{formik.errors.password}</div>
          ) : null}
        </div>
        {errormessage && (
          <div className="register-form-error">{errormessage}</div>
        )}
        <div className="account-button">
          <button className="login-button" type="submit">
            Login
          </button>
          <button
            className="register-button"
            type="submit"
            onClick={handlesignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
