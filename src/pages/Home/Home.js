import React, { useContext } from "react";
import "./Home.css";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import HomeWelcomeSection from "./HomeWelcomeSection";
import Review from "./Review";
import Howitwork from "./Howitwork";
import AccepedPayment from "./AccepedPayment";
import About from "./About";
import DayNight from "../../component/DayNight";
function Home() {
  return (
    <>
      <Nav />
      <HomeWelcomeSection />
      <AccepedPayment />
      <Howitwork />
      <About />
      <Review />
      <Footer isHomePage={true} />
    </>
  );
}

export default Home;
