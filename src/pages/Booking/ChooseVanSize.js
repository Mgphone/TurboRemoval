import React from "react";

function ChooseVanSize() {
  return (
    <>
      <div className="choosevansize">
        <h1>Choose your vansize</h1>
        <div className="booking-vansize">
          <div className="readio-container">
            <label className="radio-label" htmlFor="small">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                type="radio"
                className="radio-input"
                name="vansize"
                value="small"
                id="small"
              />
              <p>Small Van</p>
            </label>
          </div>
          <div className="readio-container">
            <label className="radio-label" htmlFor="medium">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                type="radio"
                className="radio-input"
                name="vansize"
                value="medium"
                id="medium"
              />
              <p>Medium Van</p>
            </label>
          </div>
          <div className="readio-container">
            <label className="radio-label" htmlFor="large">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                id="large"
                type="radio"
                className="radio-input"
                name="vansize"
                value="large"
                defaultChecked
              />
              <p>Large Van</p>
            </label>
          </div>
          <div className="readio-container">
            <label className="radio-label" htmlFor="luton">
              <img src="https://picsum.photos/200" alt="lorem" />
              <input
                id="luton"
                type="radio"
                className="radio-input"
                name="vansize"
                value="luton"
              />
              <p>Luton Giant</p>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChooseVanSize;
