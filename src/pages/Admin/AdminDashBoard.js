import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminAllBooking from "./AdminAllBooking";

function AdminDashBoard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}account/admindashboard`;

        const token = localStorage.getItem("token");
        if (!token) {
          // Handle case where token is not available
          navigate("/admin/login");
          return;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          // Handle case where request fails
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.username);
      } catch (error) {
        console.error("Error", error);
        // Handle error as needed
      }
    };

    fetchUserData();
  }, [navigate]);

  const logout = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}account/logout`;
      const response = await fetch(url, { credentials: "POST" });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Clear token from local storage upon successful logout
        localStorage.removeItem("token");
        navigate("/admin/login");
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
          <div className="admin-dashboard-topbar">
            <p>Welcome, {userData.username}</p>
            <Link to="/admin/login" onClick={logout}>
              <p>Logout</p>
            </Link>
          </div>
          <div className="admin-dashboarrd-contect">
            <AdminAllBooking />
          </div>
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
