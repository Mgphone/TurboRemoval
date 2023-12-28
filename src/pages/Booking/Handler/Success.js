import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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
        console.log("I send it to you, baby");
      } else {
        console.error("Backend server error");
      }
    } catch (error) {
      console.error("Error when sending to backend", error);
    }
  };

  return (
    <>
      <h1>Successs 🎉🫰🎉🫰</h1>
      {session_id && <h1>{session_id}</h1>}
    </>
  );
}

export default Success;
