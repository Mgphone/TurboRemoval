import React from "react";

function FloatingBook({ userData, closeButton }) {
  // console.log("This is for closeButton" + setCheckForm);
  // Ensure userData and userData.quote are available
  const serverQuote = userData && userData.quote;
  // const receivedData = userData && userData.yourinfo.receivedData.addresses;
  console.log(serverQuote);

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

  // const dropOfAddressStair =
  //   receivedData[receivedData.length - 1].stair &&
  //   receivedData[receivedData.length - 1].stair
  //     ? receivedData[receivedData.length - 1].stair
  //     : "No Stair";

  const viaStop =
    serverQuote && serverQuote.places && serverQuote.places.length > 2
      ? serverQuote.places.length - 2
      : "No Via Stop";

  // const totalStair = serverQuote && serverQuote.stairTotal;
  // const viaStopStair = totalStair - (pickupAddressStair + dropOfAddressStair);
  const vanSize = serverQuote && serverQuote.typeofVan;
  const worker = serverQuote && serverQuote.typeOfWorker;
  const totalPrice = serverQuote && serverQuote.totalPrice.toFixed(2);
  const totalHour = serverQuote && serverQuote.totalHour;
  const handleCloseButton = (e) => {
    e.stopPropagation();
    closeButton();
    // setCheckForm(false);
  };
  const handleBookNow = (e) => {
    e.preventDefault();
    console.log("Good Job you click Book Now");
  };
  const handleSaveLater = (e) => {
    e.preventDefault();
    console.log("Hmmmm save for later Button");
  };
  return (
    <>
      <div className="floatingbook">
        <header>
          <h1>Booking Summary</h1>

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
          {/* {vanSize && <p>Van Size: {vanSize}</p>} */}
        </div>

        <div className="floatingtotal">
          {totalPrice && (
            <p>
              TOTAL PRICE: <span className="total-price">£{totalPrice}</span>
            </p>
          )}
        </div>
        <div className="floatbutton">
          <button onClick={handleBookNow}>Book Now</button>
          <button onClick={handleSaveLater}>Save For Later</button>
        </div>
      </div>
    </>
  );
}

export default FloatingBook;
