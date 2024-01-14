import React, { useContext, useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import MyContext from "../../context/MyContext";
import "./Booking.css";
function BetweenStops({ onFormChange }) {
  const { setData, data } = useContext(MyContext);
  const [viaStops, setViaStops] = useState([]);
  const [formData, setFormData] = useState({
    viaStopsData: [],
  });
  useEffect(() => {
    // when there is no value in formdata i reset zero to viastops
    // console.log("useEffect triggered. formData:", formData);

    if (formData && formData.viaStopsData.length === 0) {
      // console.log("viaStopsData is empty. Updating addresses...");

      setData((prevState) => ({
        ...prevState,
        addresses: prevState.addresses
          .slice(0, 1)
          .concat(prevState.addresses.slice(-1)),
      }));
    }
  }, [formData]);
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
    // console.log("Length of form data" + FormData.length);
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
    if (data.addresses.length > 2) {
      setData((prevState) => ({
        ...prevState,
        addresses: prevState.addresses
          .slice(0, -2)
          .concat(prevState.addresses.slice(-1)),
      }));
    }
    //test when remove auto confirmform or not
    confirmVia();
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
        <>
          <div className="wheremoving-form-title">
            <h2>Via Stops</h2>
          </div>
          <div className="wheremoving-form-warning">
            <p>Plsease choose locations from the list</p>
          </div>
          {viaStops.map((viaStop, index) => (
            <div className="viastopinput" key={viaStop.id}>
              <div>
                <label htmlFor={viaStop.addressInput}>
                  Via Stop Address {index + 1}
                </label>

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
                          id: "Via Address",
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
              </div>
              <div>
                <label htmlFor={viaStop.addressReadOnly}>
                  Via Stop Address {index + 1}
                </label>
                <input
                  name={viaStop.addressReadOnly}
                  value={viaStop.location}
                  readOnly
                  required
                />
              </div>
              <div>
                <label htmlFor="StairFlight">Stairs</label>
                <select
                  id="StairFlight"
                  name={viaStop.selectName}
                  onChange={(e) => {
                    handlestair(e, viaStop.id);
                  }}
                  required
                >
                  <option value="">Select Flight of Stair</option>
                  <option value="0">Elevator Available</option>
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
            </div>
          ))}
        </>
      )}

      <div className="button-group">
        {viaStops.length === 0 ? (
          <>
            {" "}
            <button type="button" onClick={addVia}>
              Add Via Stop
            </button>
            <button type="button" onClick={confirmVia}>
              Confirm
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={removeVia}>
              Remove
            </button>
            <button type="button" onClick={confirmVia}>
              Confirm
            </button>
            <button type="button" onClick={addVia}>
              Add Via Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BetweenStops;
