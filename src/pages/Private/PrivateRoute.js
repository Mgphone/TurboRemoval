import React, { useContext, useEffect, useState } from "react";
import Home from "../Home/Home";
import Booking from "../Booking/Booking";
import MyContext from "../../context/MyContext";

function PrivateRoute() {
  const [allowedAccess, setAllowedAccess] = useState(false);
  const { data } = useContext(MyContext);

  useEffect(() => {
    const mydata = data?.addresses?.length >= 2;
    setAllowedAccess(mydata);
  }, [data]);
  return <>{allowedAccess ? <Booking /> : <Home />}</>;
}

export default PrivateRoute;
