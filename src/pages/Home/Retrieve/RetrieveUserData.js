import React, { useEffect } from "react";
import changeToGBTime from "../../../component/changeToGBTime";
function RetrieveUserData({ retrieveData }) {
  const date = retrieveData.retrieveData[0].date;
  const quote = retrieveData.retrieveData[0].quote;
  const totalAddress = quote.totalAddress;
  const isViaStop = totalAddress && totalAddress.length > 2;

  const handlebook = () => {
    console.log("Good Job :D");
  };
  return (
    <>
      <div className="retrieve-user-data">
        <header>Hello {quote.name.toUpperCase()}, Your Quotation:</header>

        <div className="retrieve-user-data-body">
          <h1>Date: {changeToGBTime(date)}</h1>
          <div className="address">
            <div>
              <h3>Pickup Address</h3>
              <p>
                <span className="user-paragraph">Location:</span>
                {totalAddress[0].location}
              </p>
              <p>
                <span className="user-paragraph">Stair:</span>
                {totalAddress[0].stair}
              </p>
            </div>
            <div>
              <h2>Drop-off Address</h2>
              <p>
                <span className="user-paragraph">Location:</span>
                {totalAddress[totalAddress.length - 1].location}
              </p>
              <p>
                <span className="user-paragraph">Stair:</span>
                {totalAddress[totalAddress.length - 1].stair}
              </p>
            </div>
          </div>
          {isViaStop &&
            totalAddress
              .slice(1, totalAddress.length - 1)
              .map((location, i) => (
                <div className="via-stop" key={location.id}>
                  <h2>ViaStop {i + 1}</h2>
                  <p>
                    <span className="user-paragraph">Location:</span>
                    {location.location}
                  </p>
                  <p>
                    <span className="user-paragraph">Stair:</span>
                    {location.stair}
                  </p>
                </div>
              ))}
        </div>
        <p>
          <span className="user-paragraph">Type Of Van:</span>
          {quote.typeofVan}
        </p>
        <p>
          <span className="user-paragraph">How Many Worker:</span>
          {quote.typeOfWorker}
        </p>
        <p>
          <span className="user-paragraph">How Many Hour:</span>
          {quote.totalHour}
        </p>
        <p>
          <span className="user-paragraph">Your Summary Description:</span>
          {quote.description}
        </p>
        {quote.phone && (
          <p>
            <span className="user-paragraph">Your Phone Number:</span>
            {quote.phone}
          </p>
        )}
        <p>
          <span className="user-paragraph">Your Email Address:</span>
          {quote.email}
        </p>
        <p className="user-totalPrice">
          <span className="user-paragraph">TotalPrice:</span>£
          {quote.totalPrice.toFixed(2)}
        </p>
        <button onClick={handlebook}>Book Now</button>
      </div>
    </>
  );
}

export default RetrieveUserData;
