import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
import VanSizeRadio from "./VanSizeRadio";
function ChooseVanSize() {
  const { data, setData } = useContext(MyContext);
  console.log("This is my data vansize " + data.vanSize);
  const handleRadioChange = (e) => {
    const newVanSize = e.target.value;
    if (newVanSize !== data.vanSize) {
      setData((prevState) => ({
        ...prevState,
        vanSize: newVanSize,
      }));
    }
  };
  return (
    <>
      <div className="choosevansize">
        <h1>Choose your vansize</h1>
        <div className="booking-vansize">
          <VanSizeRadio
            id="small"
            value="Small"
            label="Small Van"
            imageSrc="https://picsum.photos/200"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
          <VanSizeRadio
            id="medium"
            value="Medium"
            label="Medium Van"
            imageSrc="https://picsum.photos/200"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
          <VanSizeRadio
            id="large"
            value="Large"
            label="Large Van"
            imageSrc="https://picsum.photos/200"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
          <VanSizeRadio
            id="Extra Large"
            value="Extra"
            label="Luton Van"
            imageSrc="https://picsum.photos/200"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
          {/* <div className="readio-container">
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ChooseVanSize;
