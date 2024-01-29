import React, { useState, useContext, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import uuid from "react-uuid";
import calculateDistance from "../../component/calculateDistance";
// import { Formik, Form, Field } from "formik";
import { useFormik } from "formik";

import * as Yup from "yup";
const countryOptions = {
  types: ["(regions)"],
  componentRestrictions: { country: "UK" }, // Restrict to the United Kingdom (GB)
};
function HomeWelcomeSection() {
  const { addAddress } = useContext(MyContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [errLocation, setErrLocation] = useState("err");
  const [errDestination, setErrDestination] = useState("err");
  //user data
  // const center = { lat: 51.59034573602164, lng: -0.2221804055444608 };
  const radiusInMiles = 30;
  //this is for pickup location
  const onLoad = (autocomplete) => {
    // console.log("Change autocomplete" + autocomplete);
    setLocation(autocomplete);
  };

  const onPlaceChanged = async () => {
    if (location !== null) {
      try {
        const place = await location.getPlace();

        if (place && place.formatted_address) {
          const selectedValue = place.formatted_address;

          formik.setFieldValue("location", selectedValue);
          formik.setFieldError("location", ""); // Clear any previous errors

          const distance = calculateDistance({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });

          // console.log("miles?" + distance);

          if (distance && distance <= radiusInMiles) {
            setLocation(selectedValue);
            setErrLocation("");
          } else {
            alert("Select a location within a 30-miles radius of NW2.");
            navigate(`/checkareacover`);
            setLocation("");
          }
        }
      } catch (error) {
        console.error(error);
        // formik.setFieldError(
        //   "location",
        //   "An error occurred while fetching location details."
        // );
      }
    } else {
      console.log("Autocomplete is not loaded yet");
    }
  };

  //this is for destination
  const ondestiLoad = (autocomplete) => {
    setDestination(autocomplete);
  };
  const onPlaceDestiChanged = () => {
    if (destination !== null) {
      try {
        const place = destination.getPlace();
        if (place && place.formatted_address) {
          const selectedValue = place.formatted_address;

          formik.setFieldValue("destination", selectedValue);
          formik.setFieldError("destination", ""); // Clear any previous errors

          setDestination(selectedValue);
          setErrDestination("");

          // console.log("formated destination " + place.formatted_address);
        } else {
          alert("Please select a valid postcode from the dropdown list");
          setDestination("");
          formik.setFieldError(
            "destination",
            "Please select a valid postcode from the dropdown list"
          );
        }
      } catch (error) {
        console.error(error);
        // formik.setFieldError(
        //   "destination",
        //   "An error occurred while fetching destination details."
        // );
      }
    }
  };

  const handleQuote = (e) => {
    try {
      // console.log("You Clicked");
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      if (errLocation === "err" || errDestination === "err") {
        navigate(`/`);
      } else {
        const locationId = uuid();
        addAddress({ id: locationId, location: location });
        const destinationId = uuid();
        addAddress({ id: destinationId, location: destination });

        navigate(`/booking`);
      }
    } catch (error) {
      console.error("Error in handleQuote", error);
    }
  };
  const handleretrieve = async (e) => {
    // console.log("You Click Retrieve Button");
    navigate("/retrieve");
  };
  // add the Form validation in herer
  const validationSchema = Yup.object({
    location: Yup.string().required("Pickup PostCode is required"),
    destination: Yup.string().required("Dropoff PostCode is required"),
  });
  const formik = useFormik({
    initialValues: {
      location: "",
      destination: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleQuote(values);
    },
  });

  return (
    <>
      <div className="mapcontainer">
        {/* <img src="./images/main.jpg" alt="mainimage" loading="lazy" /> */}
        <h1 className="mainimageheader">PROFESSIONAL MAN AND VAN SERVICES</h1>
        <div className="quotesearch" id="quotesearch">
          {/* <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}> */}
          <form className="home-form" onSubmit={formik.handleSubmit}>
            <label htmlFor="search1" />
            <div>
              <Autocomplete
                options={countryOptions}
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  className="forminput"
                  type="text"
                  placeholder="Pickup PostCode"
                  // required
                  {...formik.getFieldProps("location")}
                />
              </Autocomplete>
              {formik.touched.location && formik.errors.location ? (
                <div className="home-input-error">{formik.errors.location}</div>
              ) : null}
            </div>
            <span className="inputbetween">TO</span>
            <label htmlFor="search2" />
            <div>
              <Autocomplete
                options={countryOptions}
                onLoad={ondestiLoad}
                onPlaceChanged={onPlaceDestiChanged}
              >
                <input
                  className="forminput"
                  type="text"
                  placeholder="Dropoff PostCode"
                  // required
                  {...formik.getFieldProps("destination")}
                />
              </Autocomplete>
              {formik.touched.destination && formik.errors.destination ? (
                <div className="home-input-error">
                  {formik.errors.destination}
                </div>
              ) : null}
            </div>
            <span className="inputbetween">
              <FaArrowRight />
            </span>
            <button type="submit">Quote</button>
          </form>

          <p className="home-warning">
            Exclusive to online reservations, no bookings accepted via phone or
            any other means{" "}
          </p>
          <button className="recallquote" onClick={handleretrieve}>
            Retrieve Quote
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeWelcomeSection;
