import React from "react";
import changeToGBTime from "../../../component/changeToGBTime";
function MixDisplay({
  futureQuote,
  previousQuote,
  todayQuote,
  quotationData,
  handleClick,
}) {
  return (
    <>
      {futureQuote && (
        <>
          <div className="card-container-quotation">
            {quotationData

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
          <div className="card-container-quotation">
            {quotationData
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
          <div className="card-container-quotation">
            {quotationData
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

export default MixDisplay;
