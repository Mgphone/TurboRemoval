import React from "react";
import { FaArrowRight } from "react-icons/fa";

function HomeWelcomeSection() {
  return (
    <>
      <div className="mapcontainer">
        <img src="./images/main.jpg" alt="mainimage" />
        <h1 className="mainimageheader textimage">
          Easy-Going Moving Solutions
        </h1>
        <div className="quotesearch">
          <form>
            <label htmlFor="search1" />
            <input type="text" placeholder="enter your location" />
            <span className="inputbetween">TO</span>
            <label htmlFor="search2" />
            <input type="text" placeholder="enter your destination" />
            <span className="inputbetween">
              <FaArrowRight />
            </span>
            <button>Quote</button>
          </form>

          <h2 className="secondimageheader textimage">
            We stand out as one of the top options in the city.
          </h2>
          <button className="recallquote">Recall Quote</button>
        </div>
      </div>
    </>
  );
}

export default HomeWelcomeSection;
