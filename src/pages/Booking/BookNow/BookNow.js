import React from "react";

function BookNow({ serverQuote, setIsButtonBookNow, isButtonBookNow }) {
  const handleBook = () => {
    setIsButtonBookNow(true);
    console.log("You Click" + JSON.stringify(serverQuote));
  };
  return (
    <>
      <button onClick={handleBook}>Book Now</button>
    </>
  );
}

export default BookNow;
