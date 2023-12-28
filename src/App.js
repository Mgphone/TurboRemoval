import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import Home from "./pages/Home/Home.js";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Locations from "./pages/Locations/Locations";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Booking from "./pages/Booking/Booking.js";
import Retrieve from "./pages/Home/Retrieve/Retrieve.js";
import MyContextProvider from "./context/MyContextProvider.js";
import Success from "./pages/Booking/Handler/Success.js";
import Fail from "./pages/Booking/Handler/Fail.js";

function App() {
  return (
    <MyContextProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paymentbooking/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/retrieve" element={<Retrieve />}></Route>
        </Routes>
      </div>
    </MyContextProvider>
  );
}

export default App;

// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
// } from "@react-google-maps/api";
// const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// function App() {
// const [userLocation, setUserLocation] = useState("");
// const [userDestination, setUserDestination] = useState("");

// const { isLoaded } = useJsApiLoader({
//   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//   libraries: ["places"],
// });
// if (loadError) {
//   return <div>That is an Error to load</div>;
// }
// googlemap
/*<GoogleMap
center={{ lat: 51.588745961637194, lng: -0.2205496225132663 }}
mapContainerStyle={{ width: "100%", height: "100%" }}
zoom={15}
></GoogleMap>*/

//   return (
//     <>
//       <Nav />
//     </>
//   );
// }

// export default App;
