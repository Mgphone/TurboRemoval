import React, { useState } from "react";
import RetrieveUserData from "./RetrieveUserData";
function RetrieveBody() {
  const [retrieveCode, setRetrieveCode] = useState("");
  const [retrieveData, setRetrieveData] = useState("");
  const [error, setError] = useState(null);

  const handleRetrieveCLick = async () => {
    try {
      // http://192.168.1.216:4000/saveRetrieve?randomNumber=8775667
      const url = `http://192.168.1.216:4000/saveRetrieve?randomNumber=${retrieveCode}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setRetrieveData(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData);
        setRetrieveData("");
      }
    } catch (error) {
      console.error("Error retrieving", error);
      setError("An error occurred while retrieving the quote.");
      setRetrieveData("");
    }
  };

  return (
    <>
      <div className="retrieve">
        <div className="retrievebody">
          <h1>Already received a quote?</h1>
          <input
            type="text"
            placeholder="enter your code"
            value={retrieveCode}
            onChange={(e) => setRetrieveCode(e.target.value)}
          />
          <button onClick={handleRetrieveCLick}>Retrieve</button>
        </div>
        {error && <div>{JSON.stringify(error)}</div>}
        {retrieveData && <RetrieveUserData retrieveData={retrieveData} />}
        {retrieveData && <div>{JSON.stringify(retrieveData)}</div>}
      </div>
    </>
  );
}

export default RetrieveBody;
