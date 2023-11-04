import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <App />
      </LoadScript>
    </BrowserRouter>
  </React.StrictMode>
);
