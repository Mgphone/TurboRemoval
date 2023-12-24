import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripeKey);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </LoadScript>
    </BrowserRouter>
  </React.StrictMode>
);
