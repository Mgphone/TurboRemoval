import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
import VanSizeRadio from "./VanSizeRadio";
import vanSizeImages from "../../data/vanSizeImages";
function ChooseVanSize() {
  const { data, setData } = useContext(MyContext);

  const handleRadioChange = (newVanSize) => {
    if (newVanSize !== data.vanSize) {
      setData((prevState) => ({
        ...prevState,
        vanSize: newVanSize,
      }));
    }
  };

  return (
    <>
      <div className="booking-vansize">
        {vanSizeImages.map((item) => (
          <VanSizeRadio
            key={item.id}
            id={item.id}
            value={item.value}
            label={`${item.value} Van`}
            imageSrc={item.imageSrc}
            checked={data.vanSize === item.value}
            onChange={handleRadioChange}
          />
        ))}
      </div>
    </>
  );
}

export default ChooseVanSize;
