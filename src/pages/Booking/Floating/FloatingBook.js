import React, { useEffect, useState } from "react";
import FloatingShowMore from "./FloatingShowMore";
import changeToGBTime from "../../../component/changeToGBTime";
import { useNavigate } from "react-router-dom";
import {
  FaPaypal,
  FaCcAmex,
  FaApplePay,
  FaGooglePay,
  FaCcMastercard,
} from "react-icons/fa";
import BookNow from "../BookNow/BookNow";
import SaveForLater from "../SaveForLater/SaveForLater";
import "./floatingbook.css";
function FloatingBook({ userData, closeButton, setUserData }) {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);
  const [isButtonBookNow, setIsButtonBookNow] = useState(false);
  const [isButtonSaveLater, setIsButtonSaveLater] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const serverQuote = userData && userData.quote;
  // useEffect(() => {
  //   console.log(
  //     "Welcome from floating Book userData" + JSON.stringify(userData)
  //   );
  // }, [userData]);
  // Extract information with null or "Choose" defaults
  const pickupAddress =
    serverQuote && serverQuote.places ? serverQuote.places[0] : "Choose Pickup";
  const pickupAddressStair =
    serverQuote && serverQuote.pickupStair
      ? serverQuote.pickupStair
      : "No Stair";

  const dropOfAddressStair =
    serverQuote && serverQuote.deliveryStair
      ? serverQuote.deliveryStair
      : "No Stair";

  const viaStopStair =
    serverQuote && serverQuote.viaStopStair
      ? serverQuote.viaStopStair
      : "No Stair";
  const dropOfAddress =
    serverQuote && serverQuote.places
      ? serverQuote.places[serverQuote.places.length - 1]
      : "Choose Drop Off";

  const viaStop =
    serverQuote && serverQuote.places && serverQuote.places.length > 2
      ? serverQuote.places.length - 2
      : "No Via Stop";

  const vanSize = serverQuote && serverQuote.typeofVan;
  const worker = serverQuote && serverQuote.typeOfWorker;
  const totalPrice = serverQuote && serverQuote.totalPrice.toFixed(2);
  const moveDate = serverQuote && serverQuote.date;
  const vehicleHour = serverQuote && serverQuote.totalHour;
  const totalSecond = serverQuote && serverQuote.totalSecond;
  const halfanHour = ((totalPrice * 1800) / totalSecond).toFixed(2);
  const handleCloseButton = (e) => {
    e.stopPropagation();
    closeButton();
  };

  const handleShowMore = () => {
    setIsHidden(!isHidden);
  };
  useEffect(() => {
    const keyPress = (e) => {
      if (e.key === "Escape") {
        closeButton();
      }
    };
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, [closeButton]);

  // const handlePercentageChange = (e) => {
  //   console.log("This is the value" + e.target.value);
  // };

  const handlePercentageChange = (e) => {
    // Update the state directly without parsing and stringifying
    setUserData((prevUserData) => ({
      ...prevUserData,
      quote: {
        ...prevUserData.quote,
        percentage: parseInt(e.target.value, 10),
      },
    }));
    setPercentage(parseInt(e.target.value, 10));
  };
  return (
    <>
      <div className="floatingbook">
        <header>
          {/* <h2>Booking Summary</h2> */}
          <h3>
            Moving Date:{" "}
            <span className="floattime">{changeToGBTime(moveDate)}</span>
          </h3>
          <button onClick={handleCloseButton}>X</button>
        </header>
        <div className="sub-floatingabout">
          "Dear <b>{serverQuote.name}</b>, thank you for choosing our moving
          service. We appreciate your trust. Your contact number is{" "}
          <b> {serverQuote.phone}</b>, and your email address is{" "}
          <b>{serverQuote.email}</b>. We are pleased to provide you with a
          quotation for your upcoming move."
        </div>
        <div className="floating-middle-book">
          <div className="floatingcontent">
            <h2>Your Quotation Details</h2>
            <div className="floatingpickup">
              {pickupAddress && (
                <p>
                  <span className="info-label">Pickup address:</span>
                  <span className="info-value">{pickupAddress}</span>
                </p>
              )}
              {pickupAddressStair && (
                <p>
                  <span className="info-label">PickUp stair: </span>
                  <span className="info-value">{pickupAddressStair}</span>
                </p>
              )}
            </div>
            <div className="floatingviastop">
              {viaStop && (
                <p>
                  <span className="info-label">Via Stop:</span>
                  <span className="info-value">{viaStop}</span>
                </p>
              )}

              {viaStopStair && (
                <p>
                  <span className="info-label">Via Stop Stair:</span>
                  <span className="info-value">{viaStopStair}</span>
                </p>
              )}
            </div>
            <div className="floatingdropof">
              {dropOfAddress && (
                <p>
                  <span className="info-label">Deliver address:</span>
                  <span className="info-value">{dropOfAddress}</span>
                </p>
              )}
              {dropOfAddressStair && (
                <p>
                  <span className="info-label">Delivery stair: </span>
                  <span className="info-value">{dropOfAddressStair}</span>
                </p>
              )}
            </div>
            <div className="floatingworker">
              {worker && (
                <>
                  <p>
                    <span className="info-label">Type of Worker:</span>
                  </p>
                  <p>
                    <span className="info-value">{worker}</span>{" "}
                  </p>
                </>
              )}
            </div>
            <div className="floatingvansize">
              {vanSize && (
                <>
                  <p>
                    <span className="info-label">Van Size:</span>
                  </p>
                  <p>
                    <span className="info-value">{vanSize} Van</span>
                  </p>
                </>
              )}
            </div>
            <div className="floatinghourNeed">
              {vehicleHour && (
                <>
                  <p>
                    {" "}
                    <span className="info-label">Vehicle Need:</span>
                  </p>
                  <p>
                    <span className="info-value">{vehicleHour}</span>
                  </p>
                </>
              )}
            </div>
            <div className="floatingshowmore" onClick={handleShowMore}>
              {isHidden ? "Show Less⬆️" : "Show More⬇️"}
            </div>
            {isHidden && <FloatingShowMore serverQuote={serverQuote} />}
            {/* {vanSize && <p>Van Size: {vanSize}</p>} */}
          </div>
          <div className="floatingtotal">
            {totalPrice && (
              <>
                <h2>Payment</h2>

                <div className="payment-icons">
                  <FaPaypal className="paypal-icon" />
                  <FaCcAmex className="amex-icon" />
                  <FaApplePay className="apple-pay-icon" />
                  <FaGooglePay className="google-pay-icon" />
                  <FaCcMastercard className="mastercard-icon" />
                </div>

                <label>
                  <input
                    type="radio"
                    id="30%"
                    name="Percentage"
                    value="30"
                    onChange={handlePercentageChange}
                  />
                  Deposit: 30%
                </label>
                <label>
                  <input
                    type="radio"
                    id="50%"
                    name="Percentage"
                    value="50"
                    onChange={handlePercentageChange}
                  />
                  Deposit: 50%
                </label>
                <label>
                  <input
                    type="radio"
                    id="100%"
                    name="Percentage"
                    value="100"
                    onChange={handlePercentageChange}
                  />
                  Full Amount
                </label>
              </>
            )}
            {percentage > 0 && (
              <p>
                Pay Amout{" "}
                <span className="total-price">
                  £{((percentage / 100) * totalPrice).toFixed(2)}
                </span>
              </p>
            )}
            <div className="floatbutton">
              {/* <button onClick={handleBookNow}>Book Now</button> */}
              <BookNow
                serverQuote={serverQuote}
                setIsButtonBookNow={setIsButtonBookNow}
                isButtonBookNow={isButtonBookNow}
              />
              <SaveForLater
                serverQuote={serverQuote}
                setIsButtonBookNow={setIsButtonBookNow}
                isButtonBookNow={isButtonBookNow}
              />
              {/* <button onClick={handleSaveLater}>Save For Later</button> */}
            </div>
            <div className="float-after-term">
              <h2>Hourly Charges Policy</h2>
              <p>
                For each booking, the hourly charges policy applies. Any time
                exceeding the initial {vehicleHour}is subject to an additional
                fee of<span className="total-price"> £{halfanHour}</span> per
                half-hour.
              </p>
              <h2> Congestion Charge Policy</h2>
              <p>
                Our congestion charge policy dictates that an extra £15 will be
                added to your quote if your journey commences or concludes
                within the congestion zone.
              </p>
              <h2>Toll Charge Policy</h2>
              <p>
                Under our toll charge policy, the cost of tolls is an extra
                charge beyond your initial online quote. Our drivers, equipped
                with the latest navigation systems, strive to minimize toll road
                usage whenever feasible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FloatingBook;
