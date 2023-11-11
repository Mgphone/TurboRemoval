import React, { useState } from "react";

function BetweenStops({ onFormChange }) {
  const [viaStops, setViaStops] = useState([]);
  const [formData, setFormData] = useState({
    viaStopsData: [],
  });

  const handleAddress = (e, name) => {
    const { value } = e.target;

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

  const confirmVia = () => {
    // Handle the confirmation logic here
    // console.log("Form Data:", formData.viaStopsData);
    onFormChange(formData);
    // You can trigger form submission here if needed
    // For example, you can make an API call or perform further actions
  };

  const addVia = () => {
    const newViaStop = {
      id: `viaStop_${viaStops.length}`,
      addressInput: `addressInput_${viaStops.length}`,
      addressReadOnly: `addressReadOnly_${viaStops.length}`,
      selectName: `stairFlight_${viaStops.length}`,
      location: "", // Add a value property for the input field
    };

    // Update via stops
    setViaStops([...viaStops, newViaStop]);

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
  const removevia = () => {
    const deleteLastItem = viaStops.slice(0, viaStops.length - 1);
    setViaStops(deleteLastItem);
    // Also update form data if needed

    setFormData((prevFormData) => {
      const updatedViaStopsData = prevFormData.viaStopsData.slice(
        0,
        prevFormData.viaStopsData.length - 1
      );
      return { ...prevFormData, viaStopsData: updatedViaStopsData };
    });
  };
  return (
    <div>
      {viaStops.length > 0 ? (
        <div>
          {viaStops.map((viaStop) => (
            <div className="viastop" key={viaStop.id}>
              <label htmlFor={viaStop.addressInput}>Address</label>
              <input
                required
                name={viaStop.addressInput}
                value={viaStop.value}
                onChange={(e) => handleAddress(e, viaStop.id)}
              />
              <label htmlFor={viaStop.addressReadOnly}>Address</label>
              <input
                name={viaStop.addressReadOnly}
                value={viaStop.location}
                readOnly
              />
            </div>
          ))}
        </div>
      ) : null}
      {viaStops.length > 0 ? (
        <>
          <button type="button" onClick={removevia}>
            Remove
          </button>
        </>
      ) : null}
      <button type="button" onClick={confirmVia}>
        Confirm
      </button>
      <button type="button" onClick={addVia}>
        Add Via Stop
      </button>
    </div>
  );
}

export default BetweenStops;
