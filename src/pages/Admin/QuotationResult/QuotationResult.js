import React, { useEffect } from "react";

function QuotationResult({ userClickData, setUserClickData }) {
  const handleCloseButton = (e) => {
    e.stopPropagation();
    setUserClickData(false);
  };

  useEffect(() => {
    const keyPress = (e) => {
      if (e.key === "Escape") {
        setUserClickData(false);
      }
    };
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, []);
  return (
    <>
      {userClickData && (
        <div className="userdatashow">
          <button onClick={handleCloseButton}>X</button>
          {userClickData.map((item) => (
            <div key={item._id}>
              <div>
                <h1>{item.date}</h1>
              </div>
              <div>{item.quote.name}</div>
              <div>{item.quote.email}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default QuotationResult;
