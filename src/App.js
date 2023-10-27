import { useState } from "react";
import "./App.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

function App() {
  const [userLocation, setUserLocation] = useState("");
  const [userDestination, setUserDestination] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  // if (loadError) {
  //   return <div>That is an Error to load</div>;
  // }
  return isLoaded ? (
    <div className="mapcontainer">
      <GoogleMap
        center={{ lat: 51.588745961637194, lng: -0.2205496225132663 }}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={15}
      ></GoogleMap>
      <div className="quotesearch">
        <form className="formsearch">
          <label htmlFor="search1" />
          <Autocomplete>
            <input type="text" placeholder="enter your location" />
          </Autocomplete>
          <label htmlFor="search2" />
          <Autocomplete>
            <input type="text" placeholder="enter your destination" />
          </Autocomplete>
          <button>Quote</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default App;
