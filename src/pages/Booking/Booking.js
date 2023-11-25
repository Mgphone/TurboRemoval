import React, { useState, useContext, useEffect } from "react";
// this is the page
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
// this is the context callling
import MyContext from "../../context/MyContext";

function Booking() {
  const { data } = useContext(MyContext);

  useEffect(() => {
    console.log(
      "This is from Booking main to send to the back" + JSON.stringify(data)
    );
  }, [data]);
  return (
    <>
      <Nav />
      <form className="booking-container">
        <Booking_Header />
        <ChooseVanSize />
        <Booking_Loading />
        <CaniTravel />
        <WhereMoving />
        <MileAndHour />
        <MovingDate />
        <AboutYou />
        <button>Get Free Quote</button>
      </form>
      <Footer />
    </>
  );
}

export default Booking;
