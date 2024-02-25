import React from "react";

function FloatingShowMore({ serverQuote }) {
  const locations = serverQuote.totalAddress;

  const description = serverQuote.description
    ? serverQuote.description
    : "No Description";
  const isViaStop = locations && locations.length > 2;

  return (
    <>
      <div className="floatingmorecontainer">
        {isViaStop &&
          locations.slice(1, locations.length - 1).map((location, index) => (
            <div key={location.id}>
              <h2>ViaStop{index + 1}</h2>
              <div className="floatingviastopmore">
                <p>
                  <span className="info-label">Address:</span>
                  <span className="info-value">{location.location}</span>
                </p>
                <p>
                  <span className="info-label"> Stair:</span>
                  <span className="info-value">
                    {location.stair ? `${location.stair} Stair` : "No Stair"}
                  </span>
                </p>
              </div>
            </div>
          ))}{" "}
        <div className="floatingdescription">
          {description && (
            <p>
              <span className="info-label">Description:</span>
              <span className="info-value"> {description}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default FloatingShowMore;
