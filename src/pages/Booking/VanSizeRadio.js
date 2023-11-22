import React from "react";

function VanSizeRadio({ value, label, imageSrc, checked, onChange }) {
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
            name="vansize"
            value={value}
            checked={checked === value}
            // onChange={onChange}
          />
          <p>{label}</p>
        </label>
      </div>
    </>
  );
}

export default VanSizeRadio;
