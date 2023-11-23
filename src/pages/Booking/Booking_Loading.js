import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
import BookLoadingRadio from "./BookLoadingRadio";
function Booking_Loading() {
  const { data, setData } = useContext(MyContext);
  const handleRadioChange = (e) => {
    const newDriverHelp = e.target.value;

    if (newDriverHelp !== data.driverHelp) {
      setData((prevState) => ({
        ...prevState,
        driverHelp: newDriverHelp,
      }));
    }
  };
  return (
    <>
      <div className="bookingloading">
        <div className="loading-header">
          <h1>Will you need help with loading and unloading?</h1>
          <p>
            Our drivers will be happy to help you with your move, and we can
            also provide extra people if you'd like to make your move a bit
            quicker.
          </p>
        </div>
        <div className="booking-loading">
          <BookLoadingRadio
            id="No-Help"
            value="No-Help"
            label="No-Help"
            checked={data.driverHelp}
            imageSrc="https://picsum.photos/200"
            onChange={handleRadioChange}
          />
          <BookLoadingRadio
            id="Driver-Help"
            value="Driver-Help"
            label="Driver-Help"
            checked={data.driverHelp}
            imageSrc="https://picsum.photos/200"
            onChange={handleRadioChange}
          />
          <BookLoadingRadio
            id="Driver-Plus-One"
            value="Driver-Plus-One"
            label="Driver-Plus-One"
            checked={data.driverHelp}
            imageSrc="https://picsum.photos/200"
            onChange={handleRadioChange}
          />
          <BookLoadingRadio
            id="Driver-Plus-Two"
            value="Driver-Plus-Two"
            label="Driver-Plus-Two"
            checked={data.driverHelp}
            imageSrc="https://picsum.photos/200"
            onChange={handleRadioChange}
          />
          {/* <div className="readio-container">
            <label className="radio-label" htmlFor="nohelp">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                type="radio"
                className="radio-input"
                name="loading"
                value="nohelp"
                id="nohelp"
              />
              <p>No Help</p>
            </label>
          </div>
          <div className="readio-container">
            <label className="radio-label" htmlFor="driverhelp">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                type="radio"
                className="radio-input"
                name="loading"
                value="driverhelp"
                id="driverhelp"
                defaultChecked
              />
              <p>Driver Help</p>
            </label>
          </div>
          <div className="readio-container">
            <label className="radio-label" htmlFor="driverplusone">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                type="radio"
                className="radio-input"
                name="loading"
                value="driverplusone"
                id="driverplusone"
              />
              <p>Driver Plus One</p>
            </label>
          </div>
          <div className="readio-container">
            <label className="radio-label" htmlFor="driverplustwo">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                type="radio"
                className="radio-input"
                name="loading"
                value="driverplustwo"
                id="driverplustwo"
              />
              <p>Driver Plus Two</p>
            </label>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Booking_Loading;
