import React, { useContext, useEffect, useState } from "react";
import Home from "../Home/Home";
import Booking from "../Booking/Booking";
import MyContext from "../../context/MyContext";

function PrivateRoute() {
  const [allowedAccess, setAllowedAccess] = useState(false);
  const { data } = useContext(MyContext);

  useEffect(() => {
    const mydata = data?.addresses?.length >= 2;
    console.log(data);
    setAllowedAccess(mydata);
  }, [data]);
  return <>{allowedAccess ? <Booking /> : <Home />}</>;
}

export default PrivateRoute;

// import React, { useEffect, useState } from "react";
// import { Route, Navigate } from "react-router-dom";

// function PrivateRoute({ element: Element, ...rest }) {
//   const [allowedAccess, setAllowedAccess] = useState(true);

//   useEffect(() => {
//     // Your logic to determine if access is allowed
//     const isAuthenticated = true;
//     setAllowedAccess(isAuthenticated);
//   }, []);
//   console.log(allowedAccess);
//   return allowedAccess ? (
//     <Route {...rest} element={<Element />} />
//   ) : (
//     // Redirect to login page or another page if access is not allowed
//     <Navigate to="/" replace />
//   );
// }

// export default PrivateRoute;
// import React, { useContext, useEffect, useState } from "react";
// import Home from "../Home/Home";
// import Booking from "../Booking/Booking";
// import MyContext from "../../context/MyContext";
// function PrivateRoute() {
//   const [allowedAccess, setAllowedAccess] = useState(false);
//   const { data } = useContext(MyContext);
//   const mydata = data?.addresses.length >= 2;
//   setAllowedAccess(mydata);
//   // useEffect(() => {
//   //   console.log("This is my data from context" + JSON.stringify(data));
//   // });
//   console.log("Welcome from booking" + mydata);

//   return <>{allowedAccess ? <Booking /> : <Home />}</>;
// }

// export default PrivateRoute;
