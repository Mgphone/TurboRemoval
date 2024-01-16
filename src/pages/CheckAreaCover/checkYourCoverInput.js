import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
function checkYourCoverInput() {
  const [userLocation, setUserLocation] = useState(null);
  return (
    <div className="checkyourcover-input">
      <div className="searchsticky">
        <input
          type="text"
          placeholder="Plese Enter Your Place"
          id="autocomplete-input"
          // value={userLocation}
          // onChange={(e) => setUserLocation(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
        <button
          className="buttonsearch"
          // onClick={() => handleUserLocationInput(userLocation)}
        >
          <BsSearch />
        </button>

        <button
        // onClick={getUserLocation}
        >
          <BiCurrentLocation />
        </button>
      </div>
    </div>
  );
}

export default checkYourCoverInput;
