import React from "react";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";
import manandvanlocation from "../../../data/manvandatatest";
import { NavLink, useParams } from "react-router-dom";
import { FaLocationPin } from "react-icons/fa6";
const replacedash = (str) => {
  return str.replace(/-/g, " ");
};
const replacespace = (str) => {
  return str.replace(/ /g, "-");
};
function ServiceNameComponent() {
  const { id } = useParams();
  return (
    <>
      <Nav />
      <div className="service-name-component">
        <h1>Locations for {id}</h1>
        <div className="serive-name-content">
          {manandvanlocation.map((location, index) => (
            <div key={index} className="location_click">
              <NavLink to={`/location/${id}-${replacespace(location)}`}>
                <FaLocationPin />
                {/* {id} {location} */}
                {replacedash(id)} {location}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServiceNameComponent;
