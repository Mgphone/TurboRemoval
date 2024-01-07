import React from "react";
import { useNavigate } from "react-router-dom";

function SaveForLater({ serverQuote, setIsButtonBookNow, isButtonBookNow }) {
  // const handleCLick = () => {
  //   setIsButtonBookNow(false);
  //   console.log("This is from saveforlater" + JSON.stringify(serverQuote));
  // };
  const navigate = useNavigate();
  const handleSaveLater = (e) => {
    e.preventDefault();
    // setIsButtonSaveLater(true);
    const currentDate = new Date().toISOString();
    const randomNumber = Math.floor(Math.random() * 10000000 + 1);
    const quote = serverQuote;
    const retrieveToSave = {
      date: currentDate,
      quote: quote,
      randomNumber: randomNumber,
    };
    // console.log("Before sending to server" + JSON.stringify(retrieveToSave));
    const setRetrieve = async () => {
      try {
        const response =
          // await fetch("http://192.168.1.216:4000/saveRetrieve",
          await fetch(`${process.env.REACT_APP_SERVER_URL}saveRetrieve`, {
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
        // if (savedData.success) {
        //   console.log("Data saved successuflly" + savedData.data);
        //   alert(`Thanks for choosing our service!`);
        //   window.location.href = "http://192.168.1.216:3000";
        // }
        // console.log("after sending back to server" + JSON.stringify(savedData));
        if (savedData.data) {
          alert(
            `Thanks you Chit Sone To using our service ${savedData.data.quote.name}`
          );
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
