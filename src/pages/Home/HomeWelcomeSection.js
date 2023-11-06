import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
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
  const [error, setError] = useState("");

  // this is for location
  // const onLoad = (autocomplete) => {
  //   setLocation(autocomplete);
  // };
  // const onPlaceChanged = () => {
  //   if (location !== null) {
  //     try {
  //       const place = location.getPlace();

  //       if (place && place.formatted_address) {
  //         const selectedValue = place.formatted_address;
  //         setLocation(selectedValue);
  //       } else {
  //         alert("Please select a valid postcode from dropdown list");
  //         setLocation("");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else console.log("Autocomplete is not loaded yet");
  // };
  //this is for destination
  // const ondestiLoad = (autocomplete) => {
  //   setDestination(autocomplete);
  // };
  // const onPlaceDestiChanged = () => {
  //   if (destination !== null) {
  //     try {
  //       const place = destination.getPlace();
  //       if (place && place.formatted_address) {
  //         const selectedValue = place.formatted_address;
  //         setDestination(selectedValue);
  //         // console.log("formated destination " + place.formatted_address);
  //       } else {
  //         alert("Please select a valid postcode from dropdown list");
  //         setDestination("");
  //       }
  //     } catch (error) {}
  //   }
  // };
  // const handleQuote = (e) => {
  //   e.preventDefault();
  //   // if (location === "" || destination === "") {
  //   //   navigate(`/`);
  //   // } else {
  //   navigate(
  //     `/booking/?yourlocation=${encodeURIComponent(
  //       location
  //     )}&destination=${encodeURIComponent(destination)}`
  //   );
  //   // }
  // };
  const handleYourLocation = (address) => {
    setLocation(address);
  };
  const handleYourSelect = (address) => {
    setLocation(address);
  };
  const handleDestination = (address) => {
    setDestination(address);
  };
  const handleDestiSelect = (address) => {
    setDestination(address);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() === "" || destination.trim() === "") {
      setError("Please Enter an Address");
    } else {
      navigate(
        `/booking/?yourlocation=${encodeURIComponent(
          location
        )}&destination=${encodeURIComponent(destination)}`
      );
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="search1" />
            <PlacesAutocomplete
              value={location}
              onChange={handleYourLocation}
              onSelect={handleYourSelect}
              // options={{
              //   types: ["geocode"],
              //   componentRestrictions: { country: "uk" },
              // }}
              searchOptions={countryOptions}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Enter Address 1",
                      className: "location-search-input",
                    })}
                    required
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <span className="inputbetween">TO</span>
            <PlacesAutocomplete
              value={destination}
              onChange={handleDestination}
              onSelect={handleDestiSelect}
              searchOptions={countryOptions}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Enter Address 2",
                      className: "location-search-input",
                    })}
                    required
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            {/* <Autocomplete
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
            </Autocomplete> */}

            <span className="inputbetween">
              <FaArrowRight />
            </span>
            <button type="submit">Quote</button>
          </form>
          {error && <p>{error}</p>}
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
