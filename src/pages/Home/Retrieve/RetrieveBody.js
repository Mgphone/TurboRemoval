import React, { useState } from "react";
function RetrieveBody() {
  const [retrieveData, setRetrieve] = useState(true);
  return (
    <>
      <div className="retrieve">
        <div className="retrievebody">
          <h1>Already received a quote?</h1>
          <input type="text" placeholder="enter your code" />
          <button>Retrieve</button>
        </div>
        {retrieveData && <div className="your quote">Min KO chit the</div>}
      </div>
    </>
  );
}

export default RetrieveBody;
