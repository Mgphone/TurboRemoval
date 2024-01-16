import React, { useState, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import uuid from "react-uuid";
import calculateDistance from "../../component/calculateDistance";
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
          const distance = calculateDistance({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          console.log("miles?" + distance);
          if (distance && distance <= radiusInMiles) {
            const selectedValue = place.formatted_address;
            setLocation(selectedValue);
            setErrLocation("");
          } else {
            alert("Select a location within a 30-mile radius of NW2.");
            navigate(`/checkareacover`);
            setLocation("");
          }
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

    if (errLocation === "err" || errDestination === "err") {
      navigate(`/`);
    } else {
      const locationId = uuid();
      addAddress({ id: locationId, location: location });
      const destinationId = uuid();
      addAddress({ id: destinationId, location: destination });

      navigate(`/booking`);
    }
  };
  const handleretrieve = async (e) => {
    // console.log("You Click Retrieve Button");
    navigate("/retrieve");
  };

  return (
    <>
      <div className="mapcontainer">
        {/* <img src="./images/main.jpg" alt="mainimage" loading="lazy" /> */}
        <h1 className="mainimageheader">PROFESSIONAL MAN AND VAN SERVICES</h1>
        <div className="quotesearch" id="quotesearch">
          {/* <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}> */}
          <form className="home-form" onSubmit={handleQuote}>
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
                  required
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
                  placeholder="Dropoff PostCode"
                  required
                />
              </Autocomplete>
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
