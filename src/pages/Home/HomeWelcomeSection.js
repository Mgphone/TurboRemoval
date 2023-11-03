import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { Link } from "react-router-dom";
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
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
  return (
    <>
      <div className="mapcontainer">
        <img src="./images/main.jpg" alt="mainimage" />
        <h1 className="mainimageheader textimage">
          Easy-Going Moving Solutions
        </h1>
        <div className="quotesearch">
          <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
            <form>
              <label htmlFor="search1" />
              <Autocomplete options={countryOptions}>
                <input
                  className="forminput"
                  type="text"
                  placeholder="enter your location"
                />
              </Autocomplete>
              <span className="inputbetween">TO</span>
              <label htmlFor="search2" />
              <Autocomplete options={countryOptions}>
                <input
                  className="forminput"
                  type="text"
                  placeholder="enter your destination"
                />
              </Autocomplete>
              <span className="inputbetween">
                <FaArrowRight />
              </span>
              <button>
                <Link to="/booking">Quote</Link>
              </button>
            </form>
          </LoadScript>

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
