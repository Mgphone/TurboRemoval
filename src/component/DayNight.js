// DayNight.js
import React, { useEffect } from "react";
import { MdSunny } from "react-icons/md";
import { GoSun } from "react-icons/go";

// Singleton pattern
let isDayMode = true;

function DayNight() {
  const toggleDayNight = () => {
    isDayMode = !isDayMode;
    applyStyles();
  };

  const applyStyles = () => {
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
  };

  useEffect(() => {
    applyStyles();
  }, [isDayMode]);

  return (
    <div onClick={toggleDayNight} className="DayNight">
      {isDayMode ? <GoSun /> : <MdSunny />}
    </div>
  );
}

export default DayNight;
