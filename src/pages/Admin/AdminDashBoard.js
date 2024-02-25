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
    localStorage.removeItem("token");
    navigate("/admin/login");
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
          <p>Try to In?..</p>
          <Link to="/admin/login">
            <p>Login</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoard;
