import React from "react";

function BookLoadingRadio({ value, label, imageSrc, checked, onChange }) {
  // console.log(`Rendering radio button for ${value}. Checked: ${checked}`);

  return (
    <>
      <div
        className="radio-container"
        onClick={() => onChange({ target: { value } })}
      >
        <label className="radio-label" htmlFor={value}>
          <img src={imageSrc} alt={label} />
          <input
            type="radio"
            className="radio-input"
            name="loading"
            value={value}
            // id={value}
            checked={checked === value}
            //becaureful when i checked it support to check the value!!
          />
          <p>{label}</p>
        </label>
      </div>
    </>
  );
}

export default BookLoadingRadio;

/* <div className="readio-container">
<label className="radio-label" htmlFor="nohelp">
  <img src="https://picsum.photos/200" alt="lorem" />
  <input
    type="radio"
    className="radio-input"
    name="loading"
    value="nohelp"
    id="nohelp"
  />
  <p>No Help</p>
</label> */
