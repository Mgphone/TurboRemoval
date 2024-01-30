import React, { useContext } from "react";
import MyContext from "../../context/MyContext";

function BookingDescription({ formik }) {
  const { data, setData } = useContext(MyContext);
  const handleChange = (e) => {
    formik.handleChange(e);
    const newValue = e.target.value;
    setData((prevVal) => ({
      ...prevVal,
      description: newValue,
    }));
  };
  return (
    <>
      <p className="Description_Header">
        Please enter a brief description of the items you will be moving and any
        additional contact numbers.
      </p>
      <textarea
        name="descriContent"
        id="description"
        // value={data.description}
        value={formik.values.descriContent}
        onChange={handleChange}
        rows={5}
        cols={90}
        // required
      />

      {formik.touched.descriContent && formik.errors.descriContent ? (
        <div className="error-input-booking">{formik.errors.descriContent}</div>
      ) : null}
    </>
  );
}

export default BookingDescription;
