import React, { useEffect, useState } from "react";
import RetrieveUserData from "./RetrieveUserData";
import { useParams } from "react-router-dom";
function RetrieveBody() {
  const [retrieveCode, setRetrieveCode] = useState("");
  const [retrieveData, setRetrieveData] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRetrieveCode(id);
  }, [id]);
  const handleRetrieveCLick = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_SERVER_URL}saveRetrieve?randomNumber=${retrieveCode}`;
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
    } finally {
      setLoading(false);
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
            value={retrieveCode || id}
            onChange={(e) => setRetrieveCode(e.target.value)}
          />
          <button onClick={handleRetrieveCLick}>
            {loading ? "Loading" : "Retrieve"}
          </button>
        </div>
        {error && <div>{JSON.stringify(error)}</div>}
        {loading && <div className="retrieve-user-data">Loading...</div>}
        {retrieveData && (
          <RetrieveUserData
            retrieveData={retrieveData}
            setRetrieveData={setRetrieveData}
          />
        )}
      </div>
    </>
  );
}

export default RetrieveBody;
