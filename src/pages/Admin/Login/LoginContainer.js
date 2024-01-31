import React from "react";

function LoginContainer() {
  return (
    <>
      <div className="login-container">
        <h1>Admin Login</h1>
        <div>
          <label htmlFor="Name" Name />
          <input type="text" placeholder="username" />
        </div>
        <div>
          <label htmlFor="password" />
          <input type="password" placeholder="password" />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </div>
    </>
  );
}

export default LoginContainer;
