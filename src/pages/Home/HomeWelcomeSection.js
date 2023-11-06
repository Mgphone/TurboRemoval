import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
// const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// function AutoCompleteInput({ onPlaceSelected }) {
//   const onLoad = (autocomplete) => {
//     autocomplete.setTypes(["(cities)"]);
//   };
//   return (
//     <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceSelected}>
//       <input type="text" placeholder="Enter your location" />
//     </Autocomplete>
//   );
// }
const countryOptions = {
  types: ["(regions)"], // Restrict to regions (countries)
  componentRestrictions: { country: "UK" }, // Restrict to the United Kingdom (GB)
};
function HomeWelcomeSection() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");

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
    // if (location === "" || destination === "") {
    //   navigate(`/`);
    // } else {
    navigate(
      `/booking/?yourlocation=${encodeURIComponent(
        location
      )}&destination=${encodeURIComponent(destination)}`
    );
    // }
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
          <form>
            <label htmlFor="search1" />
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
            <span className="inputbetween">TO</span>
            <label htmlFor="search2" />
            <Autocomplete
              options={countryOptions}
              onLoad={ondestiLoad}
              onPlaceChanged={onPlaceDestiChanged}
            >
              <input
                className="forminput"
                type="text"
                placeholder="enter your destination"
                // value={destination}
                // onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>

            <span className="inputbetween">
              <FaArrowRight />
            </span>
            <button onClick={handleQuote}>
              <Link to="/booking">Quote</Link>
            </button>
          </form>
          {/* </LoadScript> */}

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
