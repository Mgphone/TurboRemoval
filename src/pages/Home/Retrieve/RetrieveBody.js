import React, { useEffect, useState } from "react";
import RetrieveUserData from "./RetrieveUserData";
import { useParams } from "react-router-dom";
function RetrieveBody() {
  const [retrieveCode, setRetrieveCode] = useState("");
  const [retrieveData, setRetrieveData] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // console.log("This is idValue " + id);
  useEffect(() => {
    setRetrieveCode(id);
  }, [id]);
  const handleRetrieveCLick = async () => {
    try {
      setLoading(true);
      // http://192.168.1.216:4000/saveRetrieve?randomNumber=8775667
      // const url = `http://192.168.1.216:4000/saveRetrieve?randomNumber=${retrieveCode}`;
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
        {/* {retrieveData && <div>{JSON.stringify(retrieveData)}</div>} */}
      </div>
    </>
  );
}

export default RetrieveBody;
