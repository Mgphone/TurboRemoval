import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
function BookNow({ serverQuote, setIsButtonBookNow, isButtonBookNow }) {
  // console.log("Checking what is serverQuote" + JSON.stringify(serverQuote));
  const stripe = useStripe();
  const [sessionId, setSessionId] = useState(null);
  const handleBook = () => {
    setIsButtonBookNow(true);
    // console.log("You Click" + JSON.stringify(serverQuote));

    const payBooking = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}paymentbooking`,

          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serverQuote),
          }
        );
        if (!response.ok) {
          throw new Error(`Response error:${response.status}`);
        }
        // console.log(response);
        // else {
        //   const responseData = await response.json();
        //   console.log("Hello", responseData.message);
        // }
        const data = await response.json();
        setSessionId(data.sessionId);
        // console.log("This is sessionID" + sessionId);
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          console.error(result.error.message);
        }
        // console.log("This is data" + data);
        // const stripeCheckoutUrl = `https://checkout.stripe.com/pay/${data.sessionId}`;
        // console.log("This is the key plus url" + stripeCheckoutUrl);
        // window.location.href = stripeCheckoutUrl;
      } catch (error) {
        console.error("Error Paying ");
      }
    };
    payBooking();
  };
  return (
    <>
      <button onClick={handleBook}>Book Now</button>
      {sessionId && <p>Checkout Session ID: {sessionId}</p>}
    </>
  );
}

export default BookNow;
