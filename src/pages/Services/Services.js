import React from "react";
import Nav from "../../component/Nav";
import ProvideServices from "./ProvideServices";
import "./Services.css";
import Footer from "../../component/Footer";
import StickyBookNow from "../../component/StickyBookNow";

function Services() {
  return (
    <>
      <Nav />
      <ProvideServices />
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default Services;
