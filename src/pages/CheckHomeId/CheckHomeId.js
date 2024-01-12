import React from "react";
import LocationComponent from "../Locations/LocationComponent/LocationComponent";
import NotFound from "../NotFound/NotFound";
import { useParams } from "react-router-dom";
function CheckHomeId({ restrictHomeId }) {
  const { id } = useParams();
  if (!restrictHomeId.includes(id)) {
    return <NotFound />;
  } else {
    <LocationComponent />;
  }
}

export default CheckHomeId;
