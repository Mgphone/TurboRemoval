import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  PostalCodeElement,
} from "@stripe/react-stripe-js";
import changeToGBTime from "../../../component/changeToGBTime";
import { useNavigate } from "react-router-dom";
function RetrieveUserData({ retrieveData }) {
  const navigate = useNavigate();
  const date = retrieveData[0].date;
  const quote = retrieveData[0].quote;
  const totalAddress = quote.totalAddress;
  const isPaid =
    retrieveData[0].paymentStatus === "paid" &&
    retrieveData[0].paymentStatus !== undefined;

  const isViaStop = totalAddress && totalAddress.length > 2;
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  // console.log("this is retrieveCode from react" + retrieveCode);
  const handlePaymentSuccess = async () => {
    try {
      const updateResponse = await fetch(
        "http://192.168.1.216:4000/savebooking/updatepaymentstatus",
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
        // console.log("Payment Successed");
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
    // console.log("You click");
    if (!elements || !stripe) {
      // console.log("There is nothing");
      return;
    }
    try {
      const handleResponse = await fetch(
        "http://192.168.1.216:4000/savebooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(retrieveData),
        }
      );
      const { clientSecret } = await handleResponse.json();
      console.log("This is the result from react" + clientSecret);
      // const {paymentIntent,error}=await Stripe.
      //using stripe and card element
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
          // billing_details: {
          //   address: {
          //     postal_code: elements.getElement(PostalCodeElement).value,
          //   },
          // },
        }
      );
      if (error) {
        setPaymentError(error.message);
      } else {
        console.log("Paymnet succeeded", paymentIntent);
        await handlePaymentSuccess();
      }
    } catch (error) {
      console.error(error);
      setPaymentError(
        "An Error happen when during payment Process, Please Try again"
      );
    }
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
        {!isPaid && (
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

            {paymentError && <div style={{ color: "red" }}>{paymentError}</div>}
            <button onClick={handlebook}>Book Now</button>
          </div>
        )}
        {isPaid && <h5>You have Already paid</h5>}
      </div>
    </>
  );
}

export default RetrieveUserData;
