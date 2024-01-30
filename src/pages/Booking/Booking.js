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
import { useFormik } from "formik";
import * as Yup from "yup";

function Booking() {
  const { data } = useContext(MyContext);
  const [userData, setUserData] = useState(null);
  const [checkForm, setCheckForm] = useState(false);

  // console.log("This is checkForm" + checkForm);
  // useEffect(() => {
  //   console.log(
  //     "This is from Booking main to send to the back" +
  //       // JSON.stringify(data.yourinfo.quote)
  //       JSON.stringify(userData) +
  //       checkForm
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

  //formik setup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "Name must be at least 4 characters")
      .max(20, "Name must be at most 20 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone is required"),
    collection_address: Yup.string()
      .min(4, "Address must be at least 4 Characters")
      .required("Pickup Building Address is required"),
    collection_stair: Yup.string().required("Pickup Stair is required"),
    delivery_address: Yup.string()
      .min(4, "Address must be at least 4 Characters")
      .required("Delivery Building Address is required"),
    delivery_stair: Yup.string().required("Delivery Stair is required"),
    moving_date: Yup.string().required("Choose Moving Date is required"),
    // how_many_hour: Yup.string().required("Choose Hour Need"),
    how_many_hour: Yup.string().required("Number of hours is required"),
    descriContent: Yup.string().required("Choose Description"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      collection_address: "",
      collection_stair: "",
      delivery_address: "",
      delivery_stair: "",
      moving_date: "",
      how_many_hour: "",
      descriContent: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormCLick(values);
    },
  });
  //end formik setup
  const handleFormCLick = (e) => {
    // e.preventDefault();

    setCheckForm(true);
  };
  const closeButton = () => {
    // setCheckForm(false);
    setCheckForm(false);
  };
  return (
    <>
      <Nav />
      <form className="booking-container" onSubmit={formik.handleSubmit}>
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
        <WhereMoving formik={formik} />
        <MileAndHour userData={userData} formik={formik} />
        <MovingDate formik={formik} />
        <AboutYou formik={formik} />
        <button type="submit">Get Free Quote</button>
      </form>
      <Footer />
    </>
  );
}

export default Booking;
