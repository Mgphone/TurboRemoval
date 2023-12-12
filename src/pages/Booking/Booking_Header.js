import React, { useState } from "react";
import VanSizeGuidePopup from "./VanSizeGuidePopup";
function Booking_Header() {
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="booking-header">
        <h1>Your Man And Van quote could be as little as:</h1>
        <br />
        <h2>Which vehicle do you need?</h2>
        <p>
          It is important that you select the correct vehicle for the amount
          that you wish to move. Please be sure to consult our Size Guide for
          advice on the size of vehicle that would be suitable for you. Need
          help choosing which vehicle? Use our Van Size Calculator!
        </p>
        <button
          type="button"
          onClick={() => {
            openPopup();
          }}
        >
          Van Size Guide
        </button>
        <VanSizeGuidePopup
          isOpen={isOpen}
          closePopup={closePopup}
          clickOutside={true}
        />
      </div>
    </>
  );
}

export default Booking_Header;
