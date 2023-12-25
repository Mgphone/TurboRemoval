import React from "react";

function BookNow({ serverQuote, setIsButtonBookNow, isButtonBookNow }) {
  const handleBook = () => {
    setIsButtonBookNow(true);
    console.log("You Click" + JSON.stringify(serverQuote));

    const payBooking = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}paymentbooking`,
          // "http://192.168.1.216:4000/paymentbooking",

          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serverQuote),
          }
        );
        if (!response.ok) {
          throw new Error(`Response error:${response.status}`);
        } else {
          const responseData = await response.json();
          console.log("Hello", responseData.message);
        }
      } catch (error) {
        console.error("Error Paying ");
      }
    };
    payBooking();
  };
  return (
    <>
      <button onClick={handleBook}>Book Now</button>
    </>
  );
}

export default BookNow;
