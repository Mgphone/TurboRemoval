import React, { useContext } from "react";
import MyContext from "../../context/MyContext";

function MileAndHour() {
  const { data } = useContext(MyContext);
  console.log("This is data from MileAndHour" + JSON.stringify(data));
  return (
    <>
      <div className="mileandhour">
        <h1>How many hours do you want the vehicle for?</h1>
        <p>
          We estimate that your move will take around 4 hours, 47 minutes, if
          you think it will take less time you can reduce the number of hours.
          If you do need more time on the day all of our drivers have a pay as
          you go rate.
        </p>
        <label htmlFor="choosehour">I need this Vehicle For</label>
        <select id="choosehour">
          <option value="1">I need this for half an Hour</option>
          <option value="2">I need this for an Hour</option>
          <option value="3">I need this for an Hour and half</option>
        </select>
      </div>
    </>
  );
}

export default MileAndHour;
