import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";

function LocationComponent() {
  const { id } = useParams();
  return (
    <>
      <Nav />
      <h1>LocationComponent</h1>
      <h1>Welcome to the {id}</h1>
      <Footer />
    </>
  );
}

export default LocationComponent;
