import React, { useState, useContext, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MyContext from "../../context/MyContext";
import uuid from "react-uuid";

const countryOptions = {
  types: ["(regions)"], // Restrict to regions (countries)
  componentRestrictions: { country: "UK" }, // Restrict to the United Kingdom (GB)
};
function HomeWelcomeSection() {
  const { addAddress, setData, initialData } = useContext(MyContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [errLocation, setErrLocation] = useState("err");
  const [errDestination, setErrDestination] = useState("err");
  //this is to change address to empty
  // console.log("This is the data from home" + JSON.stringify(data));
  const resetInitialState = useLocation();

  useEffect(() => {
    if (resetInitialState.pathname === "/") {
      setData(initialData);
    }
    // console.log("this is for reset" + resetInitialState.pathname);
  }, [resetInitialState]);
  // this is for location
  const onLoad = (autocomplete) => {
    setLocation(autocomplete);
  };
  const onPlaceChanged = () => {
    if (location !== null) {
      try {
        const place = location.getPlace();

        if (place && place.formatted_address) {
          const selectedValue = place.formatted_address;
          setLocation(selectedValue);
          setErrLocation("");
        } else {
          alert("Please select a valid postcode from dropdown list");
          setLocation("");
        }
      } catch (error) {
        console.log(error);
      }
    } else console.log("Autocomplete is not loaded yet");
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
          setDestination(selectedValue);
          setErrDestination("");

          // console.log("formated destination " + place.formatted_address);
        } else {
          alert("Please select a valid postcode from dropdown list");
          setDestination("");
        }
      } catch (error) {}
    }
  };
  const handleQuote = (e) => {
    e.preventDefault();
    // const generateId = () => {
    //   return Date.now();
    // };
    if (errLocation === "err" || errDestination === "err") {
      navigate(`/`);
    } else {
      const locationId = uuid();
      addAddress({ id: locationId, location: location });
      const destinationId = uuid();
      addAddress({ id: destinationId, location: destination });
      // navigate(
      //   `/booking/?yourlocation=${encodeURIComponent(
      //     location
      //   )}&destination=${encodeURIComponent(destination)}`
      // );
      navigate(`/booking`);
    }
  };

  return (
    <>
      <div className="mapcontainer">
        <img src="./images/main.jpg" alt="mainimage" />
        <h1 className="mainimageheader textimage">
          Easy-Going Moving Solutions
        </h1>
        <div className="quotesearch">
          {/* <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}> */}
          <form onSubmit={handleQuote}>
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
                  placeholder="enter your location"
                  required

                  // value={location}
                  // onChange={(e) => setLocation(e.target.value)}
                />
              </Autocomplete>
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
                  placeholder="enter your destination"
                  required
                  // value={destination}
                  // onChange={(e) => setDestination(e.target.value)}
                />
              </Autocomplete>
            </div>
            <span className="inputbetween">
              <FaArrowRight />
            </span>
            {/* <button onClick={handleQuote}>
              <Link to="/booking">Quote</Link>
            </button> */}
            <button type="submit">Quote</button>
          </form>
          {/* </LoadScript> */}

          <p>Please choose location from the list</p>
          <h2 className="secondimageheader textimage">
            We stand out as one of the top options in the city.
          </h2>
          <button className="recallquote">Retrieve Quote</button>
        </div>
      </div>
    </>
  );
}

export default HomeWelcomeSection;
