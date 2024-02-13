import React from "react";

function DisplayYourJobs({ future, now, previous }) {
  return (
    <div className="alldata-quotation-button">
      <button onClick={future}>Future Jobs</button>
      <button onClick={now}>Today Jobs</button>
      <button onClick={previous}>Past Jobs</button>
    </div>
  );
}

export default DisplayYourJobs;
