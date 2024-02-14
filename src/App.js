import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import Home from "./pages/Home/Home.js";
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";
import Retrieve from "./pages/Home/Retrieve/Retrieve.js";
import MyContextProvider from "./context/MyContextProvider.js";
import Success from "./pages/Booking/Handler/Success.js";
import Fail from "./pages/Booking/Handler/Fail.js";
import LocationComponent from "./pages/Locations/LocationComponent/LocationComponent.js";
import PrivateRoute from "./pages/Private/PrivateRoute.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Faq from "./pages/Faq/Faq.js";
import ServiceNameComponent from "./pages/Services/ServicesComponent/ServiceNameComponent.js";
// import servicesprovided from "./data/servicesprovided.js";
import CheckHomeId from "./pages/CheckHomeId/CheckHomeId.js";
//this is import extral modules
import restrictHomeId from "./component/restrictHomeId.js";
import Terms from "./pages/TermsAndCondition/Terms.js";
import CheckAreaCover from "./pages/CheckAreaCover/CheckAreaCover.js";

//import nav and footer

import Nav from "./component/Nav.js";
import Footer from "./component/Footer.js";
import NotFound from "./pages/NotFound/NotFound.js";
//this is admin
import Login from "./pages/Admin/Login.js";
import Register from "./pages/Admin/Register.js";
import AdminDashBoard from "./pages/Admin/AdminDashBoard.js";
function App() {
  const Layout = () => {
    return (
      <>
        <Nav />
        <Outlet />
        <Footer />
      </>
    );
  };
  return (
    <MyContextProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<PrivateRoute />} />
          <Route path="/paymentbooking/success" element={<Success />} />
          <Route path="/paymentbooking/fail" element={<Fail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* <Route
            path="/:id"
            element={<CheckHomeId restrictHomeId={restrictHomeId} />}
          /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/retrieve/:id" element={<Retrieve />}></Route>
          <Route path="/retrieve" element={<Retrieve />}></Route>
          <Route path="/services/:id" element={<ServiceNameComponent />} />
          <Route path="/:id" element={<LocationComponent />}></Route>
          <Route path="/terms" element={<Terms />} />
          <Route path="/checkareacover" element={<CheckAreaCover />} />

          {/* this is for admin */}
          <Route path="/admin" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
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
