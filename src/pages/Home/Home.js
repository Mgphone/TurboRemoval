import React from "react";
import "./Home.css";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import HomeWelcomeSection from "./HomeWelcomeSection";
function Home() {
  return (
    <>
      <Nav />
      <HomeWelcomeSection />
      <Footer />
    </>
  );
}

export default Home;
