import React, { useState, useContext } from "react";
import Nav from "../../component/Nav";
import Booking_Header from "./Booking_Header";
import ChooseVanSize from "./ChooseVanSize";
import Booking_Loading from "./Booking_Loading";
import CaniTravel from "./CaniTravel";
import WhereMoving from "./WhereMoving";
import MileAndHour from "./MileAndHour";
import MovingDate from "./MovingDate";
import AboutYou from "./AboutYou";
import Footer from "../../component/Footer";
import "./Booking.css";
// import { useLocation } from "react-router-dom";
// import { Autocomplete } from "@react-google-maps/api";
import MyContext from "../../context/MyContext";
function Booking() {
  // const [finalLocation, setfinalLocation] = useState("");
  // const [finalDestination, setfinalDestination] = useState("");
  // const { location, destination } = useParams();
  const { data } = useContext(MyContext);
  console.log("this is for address" + JSON.stringify(data.addresses));
  console.log("this is the whole data" + JSON.stringify(data));
  // const allLocations = data.addresses.map((output) => output.location);
  // console.log("this is all location" + allLocations);

  return (
    <>
      <Nav />
      <div className="booking-container">
        <Booking_Header />

        <ChooseVanSize />

        <Booking_Loading />

        <CaniTravel />

        <WhereMoving />

        <MileAndHour />
        <MovingDate />
        <AboutYou />
        <button>Get Free Quote</button>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
