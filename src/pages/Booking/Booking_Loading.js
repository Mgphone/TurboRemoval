import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
// import BookLoadingRadio from "./BookLoadingRadio";
import VanSizeRadio from "./VanSizeRadio";
import helperImages from "../../data/helperImages";
import "./Booking.css";
function Booking_Loading() {
  const { data, setData } = useContext(MyContext);

  const handleRadioChange = (item) => {
    if (item !== data.driverHelp) {
      setData((prevValue) => ({
        ...prevValue,
        driverHelp: item,
      }));
    }
  };
  return (
    <>
      <div className="booking-loading">
        <div className="loading-header">
          <h2>Do you require assistance with loading and unloading?</h2>
          <p>
            Our drivers will be happy to help you with your move, and we can
            also provide extra people if you'd like to make your move a bit
            quicker.
          </p>
        </div>
        {/* <h1 className="booking-helper">Choose your Helper</h1> */}
        <div className="loading-image">
          {helperImages.map((item) => (
            <VanSizeRadio
              key={item.id}
              id={item.id}
              value={item.id}
              label={item.value}
              imageSrc={item.imageSrc}
              checked={data.driverHelp === item.value}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Booking_Loading;
