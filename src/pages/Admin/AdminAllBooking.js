// src/components/AdminAllBooking.js

import React, { useEffect, useState } from "react";

import Display from "./Display/Display";
import DisplayResult from "./Display/DIsplayResult";
import YourJobs from "./Display/YourJobs";
function AdminAllBooking() {
  const [backData, setBackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userClickData, setUserClickData] = useState(null);
  const [quotation, setQuotation] = useState(false);
  const [quotationData, setQuotationData] = useState("");
  const [dashboard, setDashBoard] = useState(false);
  const [yourJobs, setYourJobs] = useState(false);
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
  useEffect(() => {
    fetchData();
  }, []);
  const changeQuoteBackData = () => {
    const quotationResult = backData.filter(
      (item) => item.paymentStatus === "unpaid"
    );
    setQuotationData(quotationResult);
  };
  const changeYourJobsBackData = () => {
    const yourJobsResult = backData.filter((item) => {
      return (
        item.paymentStatus === "paid" ||
        item.paymentStatus === "30percentage" ||
        item.paymentStatus === "50percentage"
      );
    });
    setYourJobs(yourJobsResult);
  };
  const handleQuotation = () => {
    setQuotation(true);
    setYourJobs(false);
    setDashBoard(false);
    setUserClickData(false);
    changeQuoteBackData();
  };
  const handleYourJobs = () => {
    setQuotation(false);
    setYourJobs(true);
    setDashBoard(false);
    setUserClickData(false);
    changeYourJobsBackData();
  };
  const handleDashboard = () => {
    setDashBoard(true);
    setQuotation(false);
    setYourJobs(false);
    setUserClickData(false);
  };

  return (
    <div className="alldata">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="card-container-admin-main">
            <div
              className="card-main card-main-quotation"
              onClick={handleQuotation}
            >
              Quotation
            </div>
            <div
              className="card-main card-main-dashboard"
              onClick={handleDashboard}
            >
              Dashboard
            </div>
            <div
              className="card-main card-main-yourjobs"
              onClick={handleYourJobs}
            >
              Your Jobs
            </div>
          </div>
          {quotation && (
            <Display
              quotationData={quotationData}
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
            <YourJobs
              quotationData={yourJobs}
              setUserClickData={setUserClickData}
            />
          )}
          {userClickData && (
            <DisplayResult
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
