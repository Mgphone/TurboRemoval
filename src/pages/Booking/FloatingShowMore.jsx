import React from "react";

function FloatingShowMore({ serverQuote }) {
  const locations = serverQuote.totalAddress;
  const description = serverQuote.description
    ? serverQuote.description
    : "No Description";
  const isViaStop = locations && locations.length > 2;
  console.log(isViaStop);
  return (
    <>
      {isViaStop &&
        locations.slice(1, locations.length - 1).map((location, index) => (
          <div className="floatingviastop">
            <p key={location.id}>
              <span className="info-label">
                ViaStop{index + 1}:{location.location}
              </span>
              <span> Stair:</span>
              {location.stair ? `Stair: ${location.stair}` : "No Stair"}
            </p>
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
    </>
  );
}

export default FloatingShowMore;
