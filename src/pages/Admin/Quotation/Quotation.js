import React, { useState } from "react";
import changeToGBTime from "../../../component/changeToGBTime";
function Quotation({ backData, setUserClickData }) {
  const [futureQuote, setFutureQuote] = useState(false);
  const [previousQuote, setPreviousQuote] = useState(false);
  const handleClick = (item) => {
    console.log("you click and this is ur id" + item);
    const data = backData.filter((item) => item._id === item);
    setUserClickData(data);
  };
  const future = () => {
    setFutureQuote(true);
    setPreviousQuote(false);
  };
  const previous = () => {
    setPreviousQuote(true);
    setFutureQuote(false);
  };
  return (
    <>
      <div className="alldata-quotation-button">
        <button onClick={future}>Future Quotation</button>
        <button onClick={previous}>Previous Quotation</button>
      </div>
      {futureQuote && (
        <>
          <h2>This is your future quote</h2>
          <div className="card-container-quotation">
            {backData
              .filter((item) => item.paymentStatus === "unpaid")
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .filter((item) => new Date(item.date) > Date.now())
              .map((item, index) => (
                <div
                  key={item._id}
                  className="card-quotation"
                  onClick={() => handleClick(item._id)}
                >
                  <p>{index + 1}</p>
                  <p>Date: {changeToGBTime(item.date)}</p>
                  <p>Start Location: {item.quote.totalAddress[0].location}</p>
                  <p>
                    End Location:{" "}
                    {
                      item.quote.totalAddress[
                        item.quote.totalAddress.length - 1
                      ].location
                    }
                  </p>
                  <p>Total Price: £{item.quote.totalPrice.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </>
      )}
      {previousQuote && (
        <>
          <h2>This is your Previous quote</h2>
          <div className="card-container-quotation">
            {backData
              .filter((item) => item.paymentStatus === "unpaid")
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .filter((item) => new Date(item.date) < Date.now())
              .map((item, index) => (
                <div
                  key={item._id}
                  className="card-quotation"
                  onClick={() => handleClick(item._id)}
                >
                  <p>{index + 1}</p>
                  <p>Date: {changeToGBTime(item.date)}</p>
                  <p>Start Location: {item.quote.totalAddress[0].location}</p>
                  <p>
                    End Location:{" "}
                    {
                      item.quote.totalAddress[
                        item.quote.totalAddress.length - 1
                      ].location
                    }
                  </p>
                  <p>Total Price: £{item.quote.totalPrice.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Quotation;
