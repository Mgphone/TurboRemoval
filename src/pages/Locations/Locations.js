import React, { useState } from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import { NavLink } from "react-router-dom";
import manandvanlocation from "../../data/manvandatatest";
import houseremoval from "../../data/houseremovaldata";
import { FaLocationPin } from "react-icons/fa6";
import "./Locations.css";

function Locations() {
  const [location, setLocation] = useState(null);
  const handleClick = (location) => {
    // console.log("you click" + me);
    setLocation(location);
  };
  return (
    <>
      <Nav />
      <div className="manandvanlocation">
        {/* <h1 className="location_header">Locations</h1> */}
        {manandvanlocation.map((location, i) => (
          <div
            className="location_click"
            key={i}
            onClick={() => handleClick(location)}
          >
            <NavLink to={`/location/Man-And-Van-${location}`}>
              <FaLocationPin />
              Man and Van {location}
            </NavLink>
          </div>
        ))}
        {houseremoval.map((location, i) => (
          <div
            className="location_click"
            key={i}
            onClick={() => handleClick(location)}
          >
            <NavLink to={`/location/House-Removal-${location}`}>
              <FaLocationPin />
              House Removals{location}
            </NavLink>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Locations;
