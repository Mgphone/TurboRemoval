import React from "react";

function FloatingShowMore({ serverQuote }) {
  const locations = serverQuote.totalAddress;
  const description = serverQuote.description
    ? serverQuote.description
    : "No Description";
  const isViaStop = locations && locations.length > 2;
  console.log(isViaStop);
  return (
    <div className="floatingmorecontainer">
      {isViaStop &&
        locations.slice(1, locations.length - 1).map((location, index) => (
          <div className="floatingviastopmore">
            <div key={location.id}>
              <h3>ViaStop{index + 1}</h3>
              <span className="showmore-address">
                Address:{location.location}
              </span>
              <span> Stair:</span>
              {location.stair ? `Stair: ${location.stair}` : "No Stair"}
            </div>
          </div>
        ))}{" "}
      <div className="floatingdescription">
        {description && (
          <p>
            <span className="info-label">Description:</span>
            {description}
          </p>
        )}
      </div>
      {/* <p>Description:{description}</p> */}
    </div>
  );
}

export default FloatingShowMore;
