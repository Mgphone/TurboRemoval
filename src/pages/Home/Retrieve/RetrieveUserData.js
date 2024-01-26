import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import changeToGBTime from "../../../component/changeToGBTime";
import { useNavigate } from "react-router-dom";
function RetrieveUserData({ retrieveData, setRetrieveData }) {
  const navigate = useNavigate();
  const date = retrieveData[0].date;
  const quote = retrieveData[0].quote;
  const totalAddress = quote.totalAddress;
  const isPaid =
    retrieveData[0].paymentStatus === "unpaid" &&
    retrieveData[0].paymentStatus !== undefined;
  const paymentStatus = retrieveData[0].paymentStatus;
  const outStandingBalance = retrieveData[0].OutstandingBalance;
  const [percentage, setPercentage] = useState(null);
  const isViaStop = totalAddress && totalAddress.length > 2;
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  // useEffect(() => {
  //   console.log(
  //     "This is reteieveData from RetrieveUserData" +
  //       JSON.stringify(retrieveData)
  //   );
  // }, []);

  const handlePaymentSuccess = async () => {
    try {
      const updateResponse = await fetch(
        `${process.env.REACT_APP_SERVER_URL}savebooking/updatepaymentstatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(retrieveData),
        }
      );
      const updateResult = await updateResponse.json();
      if (updateResult.success === true) {
        alert("Payment Success");
        navigate("/");
      } else {
        console.error("Failed to update payment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlebook = async () => {
    if (!retrieveData[0].percentage) {
      alert("Please Choosea percetage option");
    }
    if (!elements && !stripe) {
      return;
    }
    try {
      const url = process.env.REACT_APP_SERVER_URL;
      const handleResponse = await fetch(`${url}savebooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(retrieveData),
      });

      const { clientSecret } = await handleResponse.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      if (error) {
        setPaymentError(error.message);
      } else {
        console.log("Payment succedd", paymentIntent);
        await handlePaymentSuccess();
      }
    } catch (error) {
      console.error(error);
      setPaymentError("An Error happen when druing payment process");
    }
  };

  const handlePercentageChange = (e) => {
    setRetrieveData((prevValue) => {
      const updatedBookings = [...prevValue];

      // Assuming there is at least one booking in the array
      if (updatedBookings.length > 0) {
        // Update the "percentage" field inside the "quote" object
        updatedBookings[0] = {
          ...updatedBookings[0],
          percentage: parseInt(e.target.value, 10), //convert to number
        };
      }

      return updatedBookings;
    });
    setPercentage(parseInt(e.target.value, 10));
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
                <span className="user-paragraph">Building Address:</span>
                {totalAddress[0].physicalAddress}
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
                <span className="user-paragraph">Building Address:</span>
                {totalAddress[totalAddress.length - 1].physicalAddress}
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
                    <span className="user-paragraph">Building Addres:</span>
                    {location.physicalAddress}
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
        {percentage && (
          <p>
            <span className="user-paragraph">You paid</span> {percentage}{" "}
            Percentage
          </p>
        )}
        {percentage && (
          <p>
            <span className="user-paragraph">
              {" "}
              Value {percentage} Percentage of {quote.totalPrice.toFixed(2)}:
            </span>{" "}
            £{((percentage / 100) * quote.totalPrice.toFixed(2)).toFixed(2)}
          </p>
        )}
        {isPaid && (
          <div>
            <p className="user-payment-percentage">
              How many Percentage you want to pay
            </p>
            <label>
              <input
                type="radio"
                id="30%"
                name="Percentage"
                value="30"
                onChange={handlePercentageChange}
              />
              30 Percentage
            </label>
            <label>
              <input
                type="radio"
                id="50%"
                name="Percentage"
                value="50"
                onChange={handlePercentageChange}
              />
              50 Percentage
            </label>
            <label>
              <input
                type="radio"
                id="100%"
                name="Percentage"
                value="100"
                onChange={handlePercentageChange}
              />
              Full Payment
            </label>

            <div className="checkispaid">
              <div style={{ marginBottom: "20px" }}>
                <label>
                  Card details
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </label>
              </div>

              {paymentError && (
                <div style={{ color: "red" }}>{paymentError}</div>
              )}
              <button onClick={handlebook}>Make Payment</button>
            </div>
          </div>
        )}
        {!isPaid && (
          <div>
            <h5>You have Already paid for {paymentStatus}</h5>
            <p>
              When you finish the booking you have to pay the driver for
              outstading balanace of £{outStandingBalance}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default RetrieveUserData;
