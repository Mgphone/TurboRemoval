import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
import timeConverter from "../../component/timeConverter";
import { FaRoad } from "react-icons/fa";
function MileAndHour({ userData, formik }) {
  const { data, setData } = useContext(MyContext);

  // const timeConverter = (time) => {
  //   const distanceInHour = Math.floor(time / 3600).toFixed(2);
  //   const distanceInMinute = Math.floor((time % 3600) / 60).toFixed(2);
  //   return `${distanceInHour}hr : ${distanceInMinute}Min`;
  // };

  const generateTimeOptions = () => {
    const options = [];
    options.push(
      <option key="" value="" disabled selected>
        Select an hour
      </option>
    );
    for (let hours = 1; hours <= 20; hours++) {
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
  const checkLoadingHour = (loading) => {
    if (loading === "Small") {
      return 1800;
    }
    if (loading === "Medium") {
      return 3600;
    }
    if (loading === "Large") {
      return 5400;
    }
    if (loading === "Luton") {
      return 7200;
    }
  };
  // const loadingTime = userData
  //   ? checkLoadingHour(userData.yourinfo.receivedData.vanSize)
  //   : "unknown";
  const yourtime = userData ? userData.quote.travelHour : "unknown";
  const yourDistance = userData
    ? userData.quote.travelMiles.toFixed(2)
    : "unknown";
  const loadingTime = userData
    ? checkLoadingHour(userData.yourinfo.receivedData.vanSize)
    : 0;
  const totalTime = yourtime + loadingTime;

  const handleHourChange = (e) => {
    formik.handleChange(e);
    const selectHour = e.target.value;
    // formik.setFieldValue("how_many_hour", selectHour);
    setData((prevState) => ({
      ...prevState,
      hour: selectHour,
    }));
  };

  return (
    <>
      <div className="mileandhour">
        <h2>For how long do you require our moving assistance?</h2>
        <p>
          <div className="estimatediv">
            Estimate Time
            <FaRoad style={{ paddingLeft: "8px" }} size="2em" />
            <ul>
              <li>
                TravelTime:<b>{timeConverter(yourtime)}</b>
              </li>
              <li>
                Loading and Unloading:<b>{timeConverter(loadingTime)}</b>
              </li>
              <li>
                Total Time:<b>{timeConverter(totalTime)}</b>
              </li>
            </ul>
          </div>
          We estimate that your just travel time will take around , and your
          distance is <b>{yourDistance} miles</b> and this is the hourif you
          think it will take less time you can reduce the number of hours. If
          you do need more time on the day all of our drivers have a pay as you
          go rate.
        </p>
        <div className="choosetime">
          <h3>I require the service for</h3>
          <select
            id="choosehour"
            name="how_many_hour"
            onChange={handleHourChange}
            // required
            value={formik.values.how_many_hour}
          >
            {generateTimeOptions()}
          </select>
          {formik.touched.how_many_hour && formik.errors.how_many_hour ? (
            <div className="error-input-booking">
              {formik.errors.how_many_hour}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MileAndHour;
