import React, { useState } from "react";
import changeToGBTime from "../../../component/changeToGBTime";
function Quotation({ backData, setUserClickData }) {
  const [futureQuote, setFutureQuote] = useState(false);
  const [previousQuote, setPreviousQuote] = useState(false);
  const [todayQuote, setTodayQuote] = useState(false);
  const handleClick = (itemId) => {
    const data = backData.filter((item) => item._id === itemId);
    setUserClickData(data);
  };
  const future = () => {
    setFutureQuote(true);
    setPreviousQuote(false);
    setTodayQuote(false);
  };
  const previous = () => {
    setPreviousQuote(true);
    setFutureQuote(false);
    setTodayQuote(false);
  };
  const now = () => {
    setTodayQuote(true);
    setFutureQuote(false);
    setPreviousQuote(false);
  };
  return (
    <>
      <div className="alldata-quotation-button">
        <button onClick={future}>Future Quotation</button>
        <button onClick={now}>Today Quotation</button>
        <button onClick={previous}>Previous Quotation</button>
      </div>
      {futureQuote && (
        <>
          <h2>Provided future quotations estimate</h2>
          <div className="card-container-quotation">
            {backData
              .filter((item) => item.paymentStatus === "unpaid")
              .sort((a, b) => new Date(a.quote.date) - new Date(b.quote.date))
              .filter((item) => new Date(item.quote.date) >= Date.now())
              .map((item, index) => (
                <div
                  key={item._id}
                  className="card-quotation"
                  onClick={() => handleClick(item._id)}
                >
                  <p>{index + 1}</p>
                  <p>Date: {changeToGBTime(item.quote.date)}</p>
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
                  <p>Unique Code:{item.randomNumber}</p>
                </div>
              ))}
          </div>
        </>
      )}
      {previousQuote && (
        <>
          <h2>Provided Past quotations estimate</h2>
          <div className="card-container-quotation">
            {backData
              .filter((item) => item.paymentStatus === "unpaid")
              .sort((a, b) => new Date(a.quote.date) - new Date(b.quote.date))
              .filter((item) => new Date(item.quote.date) < Date.now())
              .map((item, index) => (
                <div
                  key={item._id}
                  className="card-quotation"
                  onClick={() => handleClick(item._id)}
                >
                  <p>{index + 1}</p>
                  <p>Date: {changeToGBTime(item.quote.date)}</p>
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
                  <p>Unique Code:{item.randomNumber}</p>
                </div>
              ))}
          </div>
        </>
      )}
      {todayQuote && (
        <>
          <h2>Provided Today quotations estimate</h2>
          <div className="card-container-quotation">
            {backData
              .filter((item) => item.paymentStatus === "unpaid")
              .sort((a, b) => new Date(a.quote.date) - new Date(b.quote.date))
              .filter((item) => {
                const currentDate = new Date();
                const itemDate = new Date(item.quote.date);
                return (
                  currentDate.getFullYear() === itemDate.getFullYear() &&
                  currentDate.getMonth() === itemDate.getMonth() &&
                  currentDate.getDate() === itemDate.getDate()
                );
              })
              .map((item, index) => (
                <div
                  key={item._id}
                  className="card-quotation"
                  onClick={() => handleClick(item._id)}
                >
                  <p>{index + 1}</p>
                  <p>Date: {changeToGBTime(item.quote.date)}</p>
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
                  <p>Unique Code:{item.randomNumber}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Quotation;
