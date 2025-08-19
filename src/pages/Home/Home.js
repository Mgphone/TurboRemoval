import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import HomeWelcomeSection from "./HomeWelcomeSection";
import Review from "./Review";
import Howitwork from "./Howitwork";
import AccepedPayment from "./AccepedPayment";
import About from "./About";
import DayNight from "../../component/DayNight";
import ContactPopup from "../Contact/ContactPopup";

function Home() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    setIsContactPopupOpen(true);
  }, []);

  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  return (
    <>
      <Nav />
      <HomeWelcomeSection />
      <AccepedPayment />
      <Howitwork />
      <About />
      <Review />
      <Footer isHomePage={true} />
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={handleCloseContactPopup} 
      />
    </>
  );
}

export default Home;
