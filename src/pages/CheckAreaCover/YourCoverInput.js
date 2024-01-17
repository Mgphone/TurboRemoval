import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";

function YourCoverInput({ pointer }) {
  const [userInput, setUserInput] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(false);
  const handleUserLocation = async (userInput) => {
    try {
      // console.log("This is your userInput" + userInput);

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&components=country:GB`;
      const geoLocation = await fetch(url);
      if (!geoLocation.ok) {
        throw new Error("Geocoding Request Fail");
      }
      const userCoordinate = await geoLocation.json();
      const userValue = await userCoordinate.results[0].geometry.location;

      setUserLocation(userValue);
      pointer(userLocation);
      // console.log("this is yourlat and lng" + JSON.stringify(userValue));
    } catch (error) {
      console.error("There is error when handling your address");
      setError("Error with Your Address ");
    }
  };
  return (
    <div className="checkyourcover-input">
      <div className="searchsticky">
        <input
          type="text"
          placeholder="Plese Enter Your Place"
          id="autocomplete-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className="buttonsearch"
          onClick={() => handleUserLocation(userInput)}
        >
          <BsSearch />
        </button>

        {/* <button
        >
          <BiCurrentLocation />
        </button> */}
      </div>
    </div>
  );
}

export default YourCoverInput;
