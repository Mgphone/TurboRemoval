import React from "react";
import { useNavigate } from "react-router-dom";

function SaveForLater({ serverQuote, setIsButtonBookNow, isButtonBookNow }) {
  const navigate = useNavigate();
  const handleSaveLater = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const randomNumber = Math.floor(Math.random() * 10000000 + 1);
    const quote = serverQuote;
    const retrieveToSave = {
      date: currentDate,
      quote: quote,
      randomNumber: randomNumber,
    };
    const setRetrieve = async () => {
      try {
        const response =
          // await fetch("http://192.168.1.216:4000/saveRetrieve",
          await fetch(`${process.env.REACT_APP_SERVER_URL}/saveRetrieve`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(retrieveToSave),
          });
        if (!response.ok) {
          throw new Error(`Response error:${response.status}`);
        }
        const savedData = await response.json();

        if (savedData.data) {
          alert(`Thanks For Using Our Service ${savedData.data.quote.name}`);
          navigate("/");
        }
      } catch (error) {
        console.error("Error saving data" + error);
      }
    };
    setRetrieve();
  };
  return (
    <>
      <button onClick={handleSaveLater}>SaveForLater</button>
    </>
  );
}

export default SaveForLater;
