import React, { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingDescription from "./BookingDescription";

function MovingDate({ formik }) {
  const { data, setData } = useContext(MyContext);

  //set Min time for over one hour
  const minTime = new Date();
  // console.log("This is min Time" + minTime);
  if (minTime.getHours() >= 6 && minTime.getHours() <= 21) {
    minTime.setHours(new Date().getHours() + 2, 0, 0, 0);
  } else {
    minTime.setHours(6, 0, 0, 0);
    minTime.setDate(minTime.getDate());
  }
  //that is maximum can choose time over one hour
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0, 0);
  //choose current day
  if (data.date && data.date.getDate() !== new Date().getDate()) {
    minTime.setHours(6, 0, 0, 0);
  }

  const CustomInput = ({ value, onClick }) => (
    <input
      className="datepicker"
      required
      showTimeSelect
      id="moving date"
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      placeholder="Enter your Moving Date and Time"
    />
  );
  const handleChange = (date) => {
    formik.setFieldValue("moving_date", date);

    setData((prevState) => ({
      ...prevState,
      date: date,
    }));
    console.log("This is formikmoving date" + formik.values.moving_date);
  };

  return (
    <>
      <div className="movingdate">
        <div className="movidedate-header">
          <h2>When you're moving</h2>
          <p>
            Tell us when you're moving so we can check and guarantee the drivers
            availability.
          </p>
          <h5>
            Please note, any specialist items (such as pianos) will require an
            expert team. Please contact us via Instant Support to discuss these.
          </h5>
        </div>
        <div className="movingdate-description">
          <h3>
            I am planning to move on
            <br />
            {/* <input type="text" /> */}
            <DatePicker
              id="moving_date"
              name="moving_date"
              selected={formik.values.moving_date}
              showIcon
              isClearable
              closeOnScroll={true}
              timeIntervals={15}
              // selected={data.date}
              onChange={handleChange}
              showTimeSelect
              dateFormat="dd-MM-yyyy h:mmaa"
              // minDate={new Date()}
              minDate={minTime}
              minTime={minTime}
              maxTime={maxTime}
              customInput={<CustomInput />}
              withPortal
              disabledKeyboardNavigation
            />
            {formik.touched.moving_date && formik.errors.moving_date ? (
              <div className="error-input-booking">
                {formik.errors.moving_date}
              </div>
            ) : null}
          </h3>
          <BookingDescription formik={formik} />
        </div>
      </div>
    </>
  );
}

export default MovingDate;
