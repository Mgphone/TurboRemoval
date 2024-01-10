import React, { useContext } from "react";
import "./Home.css";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import HomeWelcomeSection from "./HomeWelcomeSection";
import Review from "./Review";
import Howitwork from "./Howitwork";
import AccepedPayment from "./AccepedPayment";
import About from "./About";
function Home() {
  // const { sharedData, setShareData } = useContext(MyContext);
  // const changeData = () => {
  //   setShareData("This is new Change Data");
  // };
  return (
    <>
      {/* <div>
        <p>{sharedData} </p>
        <button onClick={changeData}>Change Data</button>
      </div> */}
      <Nav />
      <HomeWelcomeSection />
      <AccepedPayment />
      {/* <ProvideServices /> */}
      <Howitwork />
      <About />
      <Review />
      <Footer />
    </>
  );
}

export default Home;
