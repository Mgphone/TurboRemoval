import React from "react";
import { useNavigate } from "react-router-dom";
function LoginContainer() {
  const navigate = useNavigate();
  const handlesignup = () => {
    // console.log("You click register");
    navigate("/register");
  };
  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <div>
        <label htmlFor="Name" />
        <input type="text" placeholder="username" />
      </div>
      <div>
        <label htmlFor="password" />
        <input type="password" placeholder="password" />
      </div>
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
  );
}

export default LoginContainer;
