// src/components/AdminAllBooking.js

import React, { useEffect, useState } from "react";

import Quotation from "./Quotation/Quotation";
import QuotationResult from "./QuotationResult/QuotationResult";
function AdminAllBooking() {
  const [backData, setBackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userClickData, setUserClickData] = useState(null);
  const [quotation, setQuotation] = useState(false);
  const [dashboard, setDashBoard] = useState(false);
  const [yourJobs, setYourJobs] = useState(false);
  console.log("This is userClickData" + JSON.stringify(userClickData));
  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}backdata/all`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setBackData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Data", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleQuotation = () => {
    setQuotation(true);
    setYourJobs(false);
    setDashBoard(false);
    setUserClickData(false);
  };
  const handleYourJobs = () => {
    setQuotation(false);
    setYourJobs(true);
    setDashBoard(false);
    setUserClickData(false);
  };
  const handleDashboard = () => {
    setDashBoard(true);
    setQuotation(false);
    setYourJobs(false);
    setUserClickData(false);
  };
  return (
    <div className="alldata">
      {/* <h1>This is User Free Quotation for future Date</h1> */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="card-container-admin-main">
            <div className="card-main" onClick={handleQuotation}>
              Quotation
            </div>
            <div className="card-main" onClick={handleDashboard}>
              Dashboard
            </div>
            <div className="card-main" onClick={handleYourJobs}>
              Your Jobs
            </div>
          </div>
          {quotation && (
            <Quotation
              backData={backData}
              setUserClickData={setUserClickData}
            />
          )}
          {dashboard && (
            <h1>
              This feature is under maintenance. We apologize for any
              inconvenience.{" "}
            </h1>
          )}
          {yourJobs && (
            <h1>
              This feature is under maintenance. We apologize for any
              inconvenience.
            </h1>
          )}
          {userClickData && (
            <QuotationResult
              userClickData={userClickData}
              setUserClickData={setUserClickData}
            />
          )}
        </>
      )}
    </div>
  );
}

export default AdminAllBooking;
