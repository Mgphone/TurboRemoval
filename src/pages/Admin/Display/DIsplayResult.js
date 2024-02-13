import React, { useEffect } from "react";
import changeToGBTime from "../../../component/changeToGBTime";
import timeConverter from "../../../component/timeConverter";
function DisplayResult({ userClickData, setUserClickData }) {
  console.log("This is from quotationResult" + JSON.stringify(userClickData));
  const [{ date: createDate, quote, paymentStatus, OutstandingBalance }] =
    userClickData;
  const {
    totalAddress,
    travelMiles,
    travelHour,
    name,
    email,
    phone,
    typeofVan,
    typeOfWorker,
    totalHour,
    totalPrice,
    totalSecond,
    date: movingDate,
    description,
  } = quote;

  const pickupPhysicalAddress = totalAddress[0].physicalAddress;
  const pickupAddress = pickupPhysicalAddress
    ? pickupPhysicalAddress + " " + totalAddress[0].location
    : totalAddress[0].location;
  const pickupStair = totalAddress[0].stair;
  const totalAddressLength = totalAddress.length;
  const dropPhysicalAddress =
    totalAddress[totalAddressLength - 1].physicalAddress;
  const dropOfAddress = dropPhysicalAddress
    ? dropPhysicalAddress + " " + totalAddress[totalAddressLength - 1].location
    : totalAddress[totalAddressLength - 1].location;
  const dropOfStair = totalAddress[totalAddressLength - 1].stair;
  const isviaStop = totalAddress.length > 2;
  const halfAnHourPrice = (totalPrice / (totalSecond / 1800)).toFixed(2);

  const handleCloseButton = (e) => {
    e.stopPropagation();
    setUserClickData(false);
  };

  useEffect(() => {
    const keyPress = (e) => {
      if (e.key === "Escape") {
        setUserClickData(false);
      }
    };
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, []);

  return (
    <>
      {userClickData && (
        <div className="userdatashow ">
          <button onClick={handleCloseButton}>X</button>
          <div className="trip-details">
            <h3>Trip Details</h3>
            <p>
              <span className="info-label">Date</span>
              {changeToGBTime(movingDate)}
            </p>
            <p>
              <span className="info-label">PickUp Address</span>
              {pickupAddress}
            </p>
            <p>
              <span className="info-label">PickUp Stair</span>
              {pickupStair}
            </p>
            <p>
              <span className="info-label">DropOf Address</span>
              {dropOfAddress}
            </p>
            <p>
              <span className="info-label">DropOf Stair</span>
              {dropOfStair}
            </p>
            <p>
              <span className="info-label">viaStop</span>
              {isviaStop ? "Yes Via Stop" : "No Via Stop"}
            </p>
            {isviaStop &&
              totalAddress
                .slice(1, totalAddressLength - 1)
                .map((viastop, index) => (
                  <div className="viastop-details">
                    <p className="info-label">ViaStop {index + 1}</p>
                    <p>
                      <span className="info-label">
                        Via Stop Address {index + 1}
                      </span>
                      {viastop.physicalAddress
                        ? viastop.physicalAddress + " " + viastop.location
                        : viastop.location}
                    </p>
                    <p>
                      <span className="info-label">
                        Via Stop {index + 1} Stair
                      </span>
                      {viastop.stair} Flight(s) of Stair
                    </p>
                  </div>
                ))}
            <p>
              <span className="info-label">Travel Time</span>
              {travelMiles.toFixed(2)} Miles
            </p>
            <p>
              <span className="info-label">Travel Hour</span>
              {timeConverter(travelHour)}
            </p>
            <p>
              <span className="info-label">Description</span>
              {description}
            </p>
          </div>
          <div className="customer-details">
            <h3>Customer Details</h3>
            <p>
              <span className="info-label">Name:</span>
              {name}
            </p>
            <p>
              <span className="info-label">Email:</span>
              {email}
            </p>
            <p>
              <span className="info-label">Phone:</span>
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          </div>
          <div className="price-details">
            <h3>Price Details</h3>
            <p>
              <span className="info-label">PaymentStatus</span>
              {paymentStatus}
            </p>
            <p>
              <span className="info-label">Half An Hour</span>£{halfAnHourPrice}
            </p>
            <p>
              <span className="info-label">Customer Book</span>
              {totalHour}
            </p>
            <p>
              <span className="info-label">Type Of Van</span>
              {typeofVan}
            </p>
            <p>
              <span className="info-label">Type Of Worker</span>
              {typeOfWorker}
            </p>
            <p>
              <span className="info-label">Total Price</span>
              <span className="info-label">£{totalPrice.toFixed(2)}</span>
            </p>
            {OutstandingBalance && (
              <p>
                <span className="info-label">OutStanding Balance</span>£
                {OutstandingBalance}
              </p>
            )}
            {/* <p>
              <span className="info-label"></span>
            </p> */}
          </div>
        </div>
      )}
    </>
  );
}

export default DisplayResult;
