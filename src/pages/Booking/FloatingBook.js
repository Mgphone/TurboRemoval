import React, { useState } from "react";
import FloatingShowMore from "./FloatingShowMore";
import changeToGBTime from "./changeToGBTime";
import { useNavigate } from "react-router-dom";

function FloatingBook({ userData, closeButton }) {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);
  const [isButtonBookNow, setIsButtonBookNow] = useState(false);
  const [isButtonSaveLater, setIsButtonSaveLater] = useState(false);

  const serverQuote = userData && userData.quote;
  // console.log("This is from serverQuote" + JSON.stringify(serverQuote));

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

  const handleCloseButton = (e) => {
    e.stopPropagation();
    closeButton();
  };
  const handleBookNow = (e) => {
    e.preventDefault();
    setIsButtonBookNow(true);
    console.log("Good Job you click Book Now" + JSON.stringify(serverQuote));
  };
  const handleSaveLater = (e) => {
    e.preventDefault();
    setIsButtonSaveLater(true);
    const currentDate = new Date().toISOString();
    const randomNumber = Math.floor(Math.random() * 10000000 + 1);
    const quote = serverQuote;
    const retrieveToSave = {
      date: currentDate,
      quote: quote,
      randomNumber: randomNumber,
    };
    // console.log("Before sending to server" + JSON.stringify(retrieveToSave));
    const setRetrieve = async () => {
      try {
        const response = await fetch("http://192.168.1.216:4000/saveRetrieve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(retrieveToSave),
        });
        if (!response.ok) {
          throw new Error(`Response error:${response.status}`);
        }
        const savedData = await response.json();
        // if (savedData.success) {
        //   console.log("Data saved successuflly" + savedData.data);
        //   alert(`Thanks for choosing our service!`);
        //   window.location.href = "http://192.168.1.216:3000";
        // }
        // console.log("after sending back to server" + JSON.stringify(savedData));
        if (savedData.data) {
          alert(
            `Thanks you Chit Sone To using our service ${savedData.data.quote.name}`
          );
          navigate("/");
        }
      } catch (error) {
        console.error("Error saving data" + error);
      }
    };
    setRetrieve();
  };

  const handleShowMore = () => {
    setIsHidden(!isHidden);
    // console.log("You click");
  };
  return (
    <>
      <div className="floatingbook">
        <div className="floatingabout">
          "Dear <b>{serverQuote.name}</b>, thank you for choosing our moving
          service. We appreciate your trust. Your contact number is{" "}
          <b> {serverQuote.phone}</b>, and your email address is{" "}
          <b>{serverQuote.email}</b>. We are pleased to provide you with a
          quotation for your upcoming move."
        </div>
        <header>
          <h2>Booking Summary</h2>
          <h3>
            Moving Date:{" "}
            <span className="floattime">{changeToGBTime(moveDate)}</span>
          </h3>
          <button onClick={handleCloseButton}>X</button>
        </header>
        <div className="floatingcontent">
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

          <div className="floatingpickup">
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
              <p>
                <span className="info-label">Type of Worker:</span>
                <span className="info-value">{worker}</span>{" "}
              </p>
            )}
          </div>
          <div className="floatingvansize">
            {vanSize && (
              <p>
                <span className="info-label">Van Size:</span>
                <span className="info-value">{vanSize} Van</span>{" "}
              </p>
            )}
          </div>
          <div className="floatinghourNeed">
            {vehicleHour && (
              <p>
                <span className="info-label">Vehicle Need:</span>
                <span className="info-value">{vehicleHour}</span>{" "}
              </p>
            )}
          </div>
          {/* {vanSize && <p>Van Size: {vanSize}</p>} */}
        </div>
        <div className="floatingshowmore" onClick={handleShowMore}>
          {isHidden ? "Show Less⬆️" : "Show More⬇️"}
        </div>
        {isHidden && <FloatingShowMore serverQuote={serverQuote} />}
        <div className="floatingtotal">
          {totalPrice && (
            <p>
              TOTAL PRICE: <span className="total-price">£{totalPrice}</span>
            </p>
          )}
        </div>
        {isButtonBookNow && (
          <div className="divbooknow">
            <div>
              <p>Dear {serverQuote.name} </p>, Your email address is{" "}
              {serverQuote.email} and your Phone Number is {serverQuote.phone}.
              Enter your bank Details:
            </div>
          </div>
        )}
        {isButtonSaveLater && (
          <div className="divsavelater">
            <div>
              <p>Dear {serverQuote.name} </p>, Your email address is{" "}
              {serverQuote.email} and your Phone Number is {serverQuote.phone}.
              Enter your bank Details:
            </div>
          </div>
        )}
        <div className="floatbutton">
          <button onClick={handleBookNow}>Book Now</button>
          <button onClick={handleSaveLater}>Save For Later</button>
        </div>
      </div>
    </>
  );
}

export default FloatingBook;
