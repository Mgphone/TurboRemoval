import React, { useState, useContext, useEffect } from "react";
// this is the page
import Nav from "../../component/Nav";
import FloatingBook from "./Floating/FloatingBook";
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
  const [userData, setUserData] = useState(null);
  const [checkForm, setCheckForm] = useState(false);

  // console.log("This is checkForm" + checkForm);
  // useEffect(() => {
  //   console.log(
  //     "This is from Booking main to send to the back" +
  //       // JSON.stringify(data.yourinfo.quote)
  //       JSON.stringify(userData)
  //   );
  // }, [data]);
  useEffect(() => {
    const sendDataToBack = async () => {
      try {
        const response =
          // await fetch("http://192.168.1.216:4000/booking",
          await fetch(`${process.env.REACT_APP_SERVER_URL}booking`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        const result = await response.json();
        // console.log(
        //   "THis is result on the after fetch" + JSON.stringify(result)
        // );
        setUserData(result);
      } catch (error) {
        console.error("There is an error when sending to back", error);
      }
    };
    sendDataToBack();
  }, [data]);

  const handleFormCLick = (e) => {
    e.preventDefault();

    setCheckForm(true);
  };
  const closeButton = () => {
    // setCheckForm(false);
    setCheckForm(false);
  };
  return (
    <>
      <Nav />
      <form className="booking-container" onSubmit={handleFormCLick}>
        {checkForm && (
          <FloatingBook
            userData={userData}
            setUserData={setUserData}
            closeButton={closeButton}
            setCheckForm={setCheckForm}
          />
        )}
        <Booking_Header />
        <ChooseVanSize />
        <Booking_Loading />
        <CaniTravel />
        <WhereMoving />
        <MileAndHour userData={userData} />
        <MovingDate />
        <AboutYou />
        <button type="submit">Get Free Quote</button>
      </form>
      <Footer />
    </>
  );
}

export default Booking;
