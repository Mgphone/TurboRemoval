import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingDescription from "./BookingDescription";

function MovingDate() {
  const { data, setData } = useContext(MyContext);
  // console.log("This is the date from Moving Date" + JSON.stringify(data.date));
  //set Min time for over one hour
  const minTime = new Date();
  minTime.setHours(new Date().getHours() + 1, 0, 0, 0);
  //that is maximum can choose time over one hour
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0, 0);
  //choose current day
  if (data.date && data.date.getDate() !== new Date().getDate()) {
    minTime.setHours(8, 0, 0, 0);
  }

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly // Disable keyboard input
    />
  );
  const handleChange = (date) => {
    setData((prevState) => ({
      ...prevState,
      date: date,
    }));
  };
  return (
    <>
      <div className="movingdate">
        <div className="movidedate-header">
          <h1>When you're moving</h1>
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
            {/* <input type="text" /> */}
            <DatePicker
              showIcon
              isClearable
              closeOnScroll={true}
              timeIntervals={15}
              selected={data.date}
              onChange={handleChange}
              showTimeSelect
              dateFormat="dd-MM-yyyy h:mmaa"
              minDate={new Date()}
              minTime={minTime}
              maxTime={maxTime}
              customInput={<CustomInput />}
            />
          </h3>
          <BookingDescription />
        </div>
      </div>
    </>
  );
}

export default MovingDate;
