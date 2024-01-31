import React, { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { GoSun } from "react-icons/go";

function DayNight() {
  const [isDayMode, setIsDayMode] = useState(true);
  const toggleDayNight = () => {
    setIsDayMode((prevValue) => !prevValue);
  };
  // --main-background-color: #fff;
  // --highlight-color: blue;
  // --main-color:#333;
  // --booking-box-color:#ccc;
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--main-background-color",
      isDayMode ? "#fff" : "#999"
    );
    document.documentElement.style.setProperty(
      "--main-color",
      isDayMode ? "#333" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--booking-box-color",
      isDayMode ? "#777" : "#ccc"
    );
  }, [isDayMode]);
  return (
    <>
      {/* <div className={isDayMode ? "day-mode" : "night-mode"}> */}
      <div onClick={toggleDayNight} className="DayNight">
        {isDayMode ? <GoSun /> : <MdSunny />}
      </div>
      {/* </div> */}
    </>
  );
}

export default DayNight;
