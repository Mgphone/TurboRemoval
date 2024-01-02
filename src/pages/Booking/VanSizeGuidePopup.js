import React, { useEffect } from "react";
import vanSizes from "../../data/vanSizes";

function VanSizeGuidePopup({ isOpen, closePopup, clickOutside }) {
  useEffect(() => {
    const keyPress = (e) => {
      if (e.key === "Escape" && isOpen) {
        closePopup();
      }
    };
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, [isOpen, closePopup]);
  const handleBackground = () => {
    if (clickOutside) {
      closePopup();
    }
  };
  const capitalizeFirstsLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      {isOpen && (
        <div className="popup" onClick={handleBackground}>
          <div className="popupactive">
            <button onClick={closePopup} className="closepopup">
              X
            </button>
            <h1>This is the Size Guide for the Van</h1>
            {vanSizes.map((item, i) => (
              <div className="popup-content" key={i}>
                <div className="popuptext" id={item.id}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <ol>
                    {Object.entries(item.specifications).map(([key, value]) => (
                      <li key={key}>
                        <b>{capitalizeFirstsLetter(key)}: </b>
                        {value}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="popup-image">
                  <img src={item.image.url} alt={item.image.altText} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default VanSizeGuidePopup;
