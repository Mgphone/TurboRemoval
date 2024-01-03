import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
import VanSizeRadio from "./VanSizeRadio";
function ChooseVanSize() {
  const { data, setData } = useContext(MyContext);
  // console.log("This is my data vansize " + data.vanSize);
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
        {/* <h1>Choose your vansize</h1> */}
        <div className="booking-vansize">
          <VanSizeRadio
            id="small"
            value="Small"
            label="Small Van"
            imageSrc="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519469/removal/small.jpg"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
          <VanSizeRadio
            id="medium"
            value="Medium"
            label="Medium Van"
            imageSrc="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519469/removal/medium.jpg"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
          <VanSizeRadio
            id="large"
            value="Large"
            label="Large Van"
            imageSrc="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519469/removal/large.jpg"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
          <VanSizeRadio
            id="Extra Large"
            value="Luton"
            label="Luton Van"
            imageSrc="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519469/removal/luton.jpg"
            checked={data.vanSize}
            onChange={handleRadioChange}
          />
        </div>
      </div>
    </>
  );
}

export default ChooseVanSize;
