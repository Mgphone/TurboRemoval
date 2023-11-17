import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function BetweenStops({ onFormChange }) {
  const [viaStops, setViaStops] = useState([]);
  const [formData, setFormData] = useState({
    viaStopsData: [],
  });

  const countryOptions = {
    types: ["(regions)"],
    componentRestrictions: { country: "UK" },
  };

  const handleAddressChange = (value, name) => {
    // Update via stops
    setViaStops((prevViaStops) =>
      prevViaStops.map((viaStop) =>
        viaStop.id === name ? { ...viaStop, location: value } : viaStop
      )
    );

    // Update form data
    setFormData((prevFormData) => {
      const updatedViaStopsData = prevFormData.viaStopsData.map((viaStopData) =>
        viaStopData.id === name
          ? { ...viaStopData, location: value }
          : viaStopData
      );
      return { ...prevFormData, viaStopsData: updatedViaStopsData };
    });

    // Automatically confirm and submit form data for the last via stop
    confirmVia();
  };

  const handleAddressSelect = async (value, name) => {
    // const results = await geocodeByAddress(value);
    // const latLng = await getLatLng(results[0]);

    // Update via stops
    setViaStops((prevViaStops) =>
      prevViaStops.map((viaStop) =>
        viaStop.id === name ? { ...viaStop, location: value } : viaStop
      )
    );

    // Update form data
    setFormData((prevFormData) => {
      const updatedViaStopsData = prevFormData.viaStopsData.map((viaStopData) =>
        viaStopData.id === name
          ? { ...viaStopData, location: value }
          : viaStopData
      );
      return { ...prevFormData, viaStopsData: updatedViaStopsData };
    });

    // Automatically confirm
    confirmVia();
  };

  const confirmVia = () => {
    // Handle the confirmation logic here
    onFormChange(formData);
    // console.log("Form Data:", formData.viaStopsData);
    // You can trigger form submission here if needed
    // API to respoond
    // console.log("This is from confirm" + JSON.stringify(formData));
  };
  // console.log("Form Data:", formData.viaStopsData);
  const addVia = () => {
    const newViaStop = {
      id: `viaStop_${viaStops.length}`,
      addressInput: `addressInput_${viaStops.length}`,
      addressReadOnly: `addressReadOnly_${viaStops.length}`,
      selectName: `stairFlight_${viaStops.length}`,
      location: "", // Add a value property for the input field
    };

    // Update via stops
    setViaStops((prevViaStops) => [...prevViaStops, newViaStop]);

    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      viaStopsData: [
        ...prevFormData.viaStopsData,
        { id: newViaStop.id, location: "" },
      ],
    }));

    // console.log("This is viastop " + (viaStops.length + 1));
  };

  const removeVia = () => {
    setViaStops((prevViaStops) => prevViaStops.slice(0, -1));

    setFormData((prevFormData) => ({
      ...prevFormData,
      viaStopsData: prevFormData.viaStopsData.slice(0, -1),
    }));
  };
  const handlestair = (e, name) => {
    const { value } = e.target;
    // console.log("this is stair value" + value);
    setViaStops((prevViaStops) =>
      prevViaStops.map((viaStop) =>
        viaStop.id === name ? { ...viaStop, stair: value } : viaStop
      )
    );

    //update form data
    setFormData((prevFormData) => {
      const updateStiarData = prevFormData.viaStopsData.map((viaStopData) =>
        viaStopData.id === name ? { ...viaStopData, stair: value } : viaStopData
      );
      return { ...prevFormData, viaStopsData: updateStiarData };
    });
  };
  return (
    <div className="viastop">
      {viaStops.length > 0 && (
        <div>
          <div className="viaStops-header">
            <h2>Via Stops</h2>
            <p>Plsease choose locations from the list</p>
          </div>
          {viaStops.map((viaStop) => (
            <div className="viastopinput" key={viaStop.id}>
              <label htmlFor={viaStop.addressInput}>Address</label>

              <PlacesAutocomplete
                value={viaStop.location}
                onChange={(value) => handleAddressChange(value, viaStop.id)}
                onSelect={(value) => handleAddressSelect(value, viaStop.id)}
                searchOptions={countryOptions}
                key={`placesAutocomplete_${viaStop.id}`}
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
                        name: viaStop.addressInput,
                        placeholder: "Enter address",
                      })}
                      required
                    />

                    <div>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => (
                        <div
                          {...getSuggestionItemProps(suggestion)}
                          key={suggestion.placeId}
                        >
                          {suggestion.description}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <label htmlFor={viaStop.addressReadOnly}>Address</label>
              <input
                name={viaStop.addressReadOnly}
                value={viaStop.location}
                readOnly
                required
              />
              <label htmlFor="StairFlight">Choose Stair of Flight</label>
              <select
                id="StairFlight"
                name={viaStop.selectName}
                onChange={(e) => {
                  handlestair(e, viaStop.id);
                }}
                required
              >
                <option value="">Select Flight of Stair</option>
                <option value="0">No Flight of Stair</option>
                <option value="1">1 Flight of Stair</option>
                <option value="2">2 Flight of Stair</option>
                <option value="3">3 Flight of Stair</option>
                <option value="4">4 Flight of Stair</option>
                <option value="5">5 Flight of Stair</option>
                <option value="6">6 Flight of Stair</option>
                <option value="7">7 Flight of Stair</option>
                <option value="8">8 Flight of Stair</option>
              </select>
            </div>
          ))}
        </div>
      )}
      <div className="button-group">
        {viaStops.length > 0 && (
          <button type="button" onClick={removeVia}>
            Remove
          </button>
        )}
        <button type="button" onClick={confirmVia}>
          Confirm
        </button>
        <button type="button" onClick={addVia}>
          Add Via Stop
        </button>
      </div>
    </div>
  );
}

export default BetweenStops;
