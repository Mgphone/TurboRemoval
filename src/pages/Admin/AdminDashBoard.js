import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
function AdminDashBoard() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}account/admindashboard`;

    fetch(url, { methold: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((data) => setUserData(data.username))
      .catch((error) => console.error("Error", error));
  }, []);
  const logout = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}account/logout`;
      const response = await fetch(url, { credentials: "POST" });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert("Logout Failed");
      }
    } catch (error) {
      console.error("Error During Logout", error);
    }
  };
  return (
    <div className="admin-dashboard">
      {userData ? (
        <>
          {" "}
          <div className="admin-dashboard-topbar">
            <p>Welcome,{userData.username}</p>
            <Link to="/admin/login" onClick={logout}>
              <p>Logout</p>
            </Link>
          </div>
          <Dashboard />
        </>
      ) : (
        <div className="admin-dashboard-topbar">
          <p>Loading...</p>
          <Link to="/admin/login">
            <p>Login</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoard;
