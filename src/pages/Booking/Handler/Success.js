import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";
import { FaCheckCircle } from "react-icons/fa";
import "./success.css";

function Success() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    console.log(`Success! session ID: ${session_id}`);

    // Only send to the backend if session_id exists
    if (session_id) {
      sendToBack(session_id);
    }
  }, [session_id, searchParams]);

  const sendToBack = async (sessionId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}paymentbooking/success`,
        // "http://192.168.1.216:4000/paymentbooking/success",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );
      console.log(response.status);
      if (response.ok) {
        console.log("I send it to you,Money Transfer done");
      } else {
        console.error("Backend server error");
      }
    } catch (error) {
      console.error("Error when sending to backend", error);
    }
  };

  return (
    <>
      <Nav />

      <div className="success-container">
        <h1 className="success-heading">Payment Successful!</h1>
        <p>Your payment has been successfully processed.</p>
        {/* {session_id && <h1>{session_id}</h1>} */}
        <div className="icon-container">
          <FaCheckCircle className="success-icon" />
        </div>

        <p className="thank-you">Thank you for your purchase.</p>
      </div>
      <Footer />
    </>
  );
}

export default Success;
