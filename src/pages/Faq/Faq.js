import React from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import Faqcontainer from "./Faqcontainer";
import "./faq.css";

import StickyBookNow from "../../component/StickyBookNow";
function Faq() {
  return (
    <>
      <Nav />
      <Faqcontainer />
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default Faq;
