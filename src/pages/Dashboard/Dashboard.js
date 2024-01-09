import React, { useState } from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";

function Dashboard() {
  const [serverHealth, setServerHealth] = useState(null);
  const [serverIP, setServerIP] = useState(null);
  const checkServerHealth = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}dashboard/health`
      );
      if (response.ok) {
        const data = await response.json();
        setServerHealth(data.health);
      } else {
        setServerHealth("error");
      }
    } catch (error) {
      console.error("Error checking server health", error);
    }
  };
  const handleIpAddress = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}dashboard`
      );
      if (response.ok) {
        const data = await response.json();
        setServerIP(data.serverIp);
      } else {
        setServerIP("error");
      }
    } catch (error) {
      console.error("Error Checking IP address", error);
    }
  };
  return (
    <>
      <Nav />
      <div className="dashboard-container">
        <h1>Welcome from the admin DashBoard</h1>
        <div className="dashboard-checker">
          <p>
            Server status:{" "}
            {serverHealth === null ? "Click Me to Check" : serverHealth}
          </p>
          <button onClick={checkServerHealth}>Check Server Health</button>
        </div>
        <div className="dashboard-checker">
          <p>
            Server Address: {serverIP === null ? "Click Me to Check" : serverIP}
          </p>
          <button onClick={handleIpAddress}>Check Server IP</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
