import React from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import CheckAreaCoverBody from "./CheckAreaCoverBody";
import StickyBookNow from "../../component/StickyBookNow";
import "./checkareacover.css";
function CheckAreaCover() {
  return (
    <>
      <Nav />
      <CheckAreaCoverBody />
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default CheckAreaCover;
