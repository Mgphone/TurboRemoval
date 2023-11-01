import React from "react";
import { FaArrowRight } from "react-icons/fa";

function HomeWelcomeSection() {
  return (
    <>
      <div className="mapcontainer">
        <div className="quotesearch">
          <form className="formsearch">
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
        </div>
      </div>
    </>
  );
}

export default HomeWelcomeSection;
