import React from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

function Between({
  inputValue,
  handleInputChange,
  inputAddress,
  handleInputAddressChange,
  selectedStair,
  handleStairChange,
}) {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  return (
    <>
      <div className="viastop">
        <div className="wheremoving-form-title">
          <h2>Via Stops</h2>
        </div>
        <label htmlFor="collection" className="between">
          Via
        </label>
        <ReactGoogleAutocomplete
          id="locationInput"
          apiKey={apiKey}
          onPlaceSelected={(place) => {
            handleInputChange(place.formatted_address);
          }}
          placeholder="Enter location"
          value={inputValue}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "uk" },
          }}
          required
          defaultValue="London NW2, UK"
        />

        <label htmlFor="address">Physical Address</label>
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => handleInputAddressChange(e.target.value)}
          required
        />
        <select
          value={selectedStair}
          onChange={(e) => handleStairChange(e.target.value)}
        >
          <option value={-1}>Please Choose From the List</option>
          <option value={0}>Elevator Available</option>
          <option value={0}>0 Flight of Stair</option>
          <option value={1}>1 Flight of Stair</option>
          <option value={2}>2 Flight of Stair</option>
          <option value={3}>3 Flight of Stair</option>
          <option value="4">4 Flight of Stair</option>
          <option value="5">5 Flight of Stair</option>
          <option value="6">6 Flight of Stair</option>
          <option value="7">7 Flight of Stair</option>
          <option value="8">8 Flight of Stair</option>
        </select>
      </div>
    </>
  );
}
export default Between;
