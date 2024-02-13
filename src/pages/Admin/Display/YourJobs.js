import React, { useState } from "react";
import MixDisplay from "./MixDisplay";
import DisplayYourJobs from "./DisplayYourJobs";
function YourJobs({ quotationData, setUserClickData }) {
  const [futureQuote, setFutureQuote] = useState(false);
  const [previousQuote, setPreviousQuote] = useState(false);
  const [todayQuote, setTodayQuote] = useState(false);
  const handleClick = (itemId) => {
    const data = quotationData.filter((item) => item._id === itemId);
    setUserClickData(data);
  };
  const future = () => {
    setFutureQuote(true);
    setPreviousQuote(false);
    setTodayQuote(false);
  };
  const previous = () => {
    setPreviousQuote(true);
    setFutureQuote(false);
    setTodayQuote(false);
  };
  const now = () => {
    setTodayQuote(true);
    setFutureQuote(false);
    setPreviousQuote(false);
  };
  return (
    <>
      <div className="yourjobs">
        <DisplayYourJobs future={future} previous={previous} now={now} />
        <MixDisplay
          futureQuote={futureQuote}
          previousQuote={previousQuote}
          todayQuote={todayQuote}
          handleClick={handleClick}
          quotationData={quotationData}
          setUserClickData={setUserClickData}
        />
      </div>
    </>
  );
}

export default YourJobs;
