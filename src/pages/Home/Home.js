import React from "react";
import "./Home.css";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import HomeWelcomeSection from "./HomeWelcomeSection";
import Review from "./Review";
function Home() {
  return (
    <>
      <Nav />
      <HomeWelcomeSection />
      <Review />
      <Footer />
    </>
  );
}

export default Home;
