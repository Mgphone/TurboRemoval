import React, { useContext } from "react";
import MyContext from "../../context/MyContext";

function BookingDescription() {
  const { data, setData } = useContext(MyContext);
  const handleChange = (e) => {
    const newValue = e.target.value;

    setData((prevVal) => ({
      ...prevVal,
      description: newValue,
    }));
  };
  return (
    <>
      <label className="Description_Header">
        Please enter a brief description of the items you will be moving and any
        additional contact numbers.
        <textarea
          name="descriContent"
          value={data.description}
          onChange={handleChange}
          rows={5}
          cols={90}
        />
      </label>
    </>
  );
}

export default BookingDescription;
