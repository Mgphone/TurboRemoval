import React from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import faq from "../../data/faq";
import "./faq.css";
function Faq() {
  return (
    <>
      <Nav />
      <div className="faq-container">
        <div className="faq-header">FAQ</div>
        {faq.map((item) => (
          <div className="faq" key={item.id}>
            <p className="question">{item.question}</p>
            <p className="answer">{item.answer}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Faq;
