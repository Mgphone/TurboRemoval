import React, { useState } from "react";
import faq from "../../data/faq";
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
function Faqcontainer() {
  const [showAnswer, setShowAnswer] = useState(null);
  const handleClick = (id) => {
    setShowAnswer(id);
  };
  return (
    <>
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
    </>
  );
}

export default Faqcontainer;
