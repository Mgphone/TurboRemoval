import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
function CheckYourCoverInput() {
  const [userLocation, setUserLocation] = useState(null);
  return (
    <div className="checkyourcover-input">
      <div className="searchsticky">
        <input
          type="text"
          placeholder="Plese Enter Your Place"
          id="autocomplete-input"
        />
        <button className="buttonsearch">
          <BsSearch />
        </button>

        <button>
          <BiCurrentLocation />
        </button>
      </div>
    </div>
  );
}

export default CheckYourCoverInput;
