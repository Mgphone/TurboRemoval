import React, { useState } from "react";
function DisplayQuote({ future, now, previous }) {
  return (
    <>
      <div className="alldata-quotation-button">
        <button onClick={future}>Future Quotation</button>
        <button onClick={now}>Today Quotation</button>
        <button onClick={previous}>Previous Quotation</button>
      </div>
    </>
  );
}

export default DisplayQuote;
