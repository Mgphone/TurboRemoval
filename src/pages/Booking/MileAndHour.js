import React, { useContext } from "react";
import MyContext from "../../context/MyContext";

function MileAndHour({ userData }) {
  const { data, setData } = useContext(MyContext);

  const timeConverter = (time) => {
    const distanceInHour = Math.floor(time / 3600).toFixed(2);
    const distanceInMinute = Math.floor((time % 3600) / 60).toFixed(2);
    return `${distanceInHour}hr : ${distanceInMinute}Min`;
  };
  const yourtime = userData
    ? timeConverter(userData.quote.totalHour)
    : "unknown";
  const yourDistance = userData
    ? userData.quote.totalMiles.toFixed(2)
    : "unknown";

  const generateTimeOptions = () => {
    const options = [];
    for (let hours = 0; hours <= 15; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const timeString = `${formattedHours}hr:${formattedMinutes}Min`;
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>
        );
      }
    }
    return options;
  };

  const handleHourChange = (e) => {
    const selectHour = e.target.value;
    // console.log("This is selectHour from Mile and Hour" + selectHour);
    setData((prevState) => ({
      ...prevState,
      hour: selectHour,
    }));
  };
  return (
    <>
      <div className="mileandhour">
        <h1>How many hours do you want the vehicle for?</h1>
        <p>
          We estimate that your just travel time will take around{" "}
          <b>{yourtime}</b>, and your distance is <b>{yourDistance} miles</b> if
          you think it will take less time you can reduce the number of hours.
          If you do need more time on the day all of our drivers have a pay as
          you go rate.
        </p>
        <label htmlFor="choosehour">I need this Vehicle For</label>
        <select id="choosehour" onChange={handleHourChange}>
          {generateTimeOptions()}
        </select>
      </div>
    </>
  );
}

export default MileAndHour;
