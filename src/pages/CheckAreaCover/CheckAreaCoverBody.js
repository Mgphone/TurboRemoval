import React, { useState } from "react";
import AreacCoverMap from "./AreacCoverMap";
import YourCoverInput from "./YourCoverInput";
function CheckAreaCoverBody() {
  // const [pointer, setPointer] = useState("");
  const [customPoint, setCustomPoint] = useState("");
  const apikey = process.env.REACT_APP_GOOGLE_API_KEY;
  const center = { lat: 51.59034573602164, lng: -0.2221804055444608 };
  const radius = 48282;

  const handlePointer = (childData) => {
    // console.log("Data receive from child" + childData);
    setCustomPoint(childData);
  };
  // console.log("this is pointer value" + customPoint);
  return (
    <div className="checkareacover-body">
      <h1>"Coverage Area"</h1>
      <p>
        Explore stress-free removals with our efficient recovery area check for
        pickups, offering seamless services within specific regions. While
        pickup is limited to designated areas, our nationwide delivery ensures
        widespread coverage for a smooth and reliable transportation experience
        across the country.
      </p>
      <YourCoverInput pointer={handlePointer} />
      <AreacCoverMap
        apiKey={apikey}
        center={center}
        radius={radius}
        pointer={customPoint}
      />
    </div>
  );
}

export default CheckAreaCoverBody;
