import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";
function AreacCoverMap({ apiKey, center, radius }) {
  const mapStyles = {
    height: "70vh",
    width: "90%",
    margin: "5vh auto",
    // paddingBottom: "10vh",
  };
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: apiKey });
  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error Loading Maps....</div>;
  return (
    <div className="google-cover-check">
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={7}>
        <Circle
          center={center}
          radius={radius}
          options={{
            fillColor: "pink",
            fillOpacity: 0.35,
            strokeColor: "red",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />

        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default AreacCoverMap;
