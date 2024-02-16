import React from "react";
import LocationComponent from "../Locations/LocationComponent/LocationComponent";
import NotFound from "../NotFound/NotFound";
import { useParams } from "react-router-dom";
function CheckHomeId({ restrictHomeId }) {
  const { id } = useParams();
  const flatRestictHomeId = restrictHomeId.flat();
  if (!flatRestictHomeId.includes(id)) {
    return <NotFound />;
  } else {
    return <LocationComponent postalAndServices={id} />;
  }
}

export default CheckHomeId;
