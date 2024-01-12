import React, { useState } from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import faq from "../../data/faq";
import "./faq.css";
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
import StickyBookNow from "../../component/StickyBookNow";
function Faq() {
  const [showAnswer, setShowAnswer] = useState(null);
  const handleClick = (id) => {
    setShowAnswer(id);
  };
  return (
    <>
      <Nav />
      <div className="faq-container">
        <div className="faq-header">FAQ</div>
        {faq.map((item) => (
          <div
            className="faq"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <p className="question">
              <FaQuestionCircle className="question-icon" />
              {item.question}
            </p>
            <p className={`answer ${showAnswer === item.id ? "true" : ""}`}>
              <FaCheckCircle className="answer-icon" />
              {item.answer}
            </p>
          </div>
        ))}
      </div>
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default Faq;
