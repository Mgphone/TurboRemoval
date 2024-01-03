import React from "react";

function VanSizeRadio({ id, value, label, imageSrc, checked, onChange }) {
  return (
    <>
      <div className={`radio-container ${checked ? "active-radio" : ""}`}>
        <label className="radio-label" htmlFor={id}>
          <div className="radio-image-container">
            <img src={imageSrc} alt={label} />
          </div>
          <input
            type="radio"
            className="radio-input"
            name={label}
            id={id}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
          />
          <p>{label}</p>
        </label>
      </div>
    </>
  );
}

export default VanSizeRadio;
