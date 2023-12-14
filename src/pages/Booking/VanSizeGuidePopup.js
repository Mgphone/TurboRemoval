import React, { useEffect } from "react";

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
  return (
    <>
      {isOpen && (
        <div className="popup" onClick={handleBackground}>
          <div className="popupactive">
            <button onClick={closePopup} className="closepopup">
              X
            </button>
            <h1>This is the Size Guide for the Van</h1>
            <div className="popup-content">
              <div className="popuptext">
                <h2>Typical Giant (Luton) Van Load Space Specifications</h2>
                <p>
                  The Luton Van is the champion of 3 bedroom flat/house
                  removals, office relocations and heavy item moves. The Luton
                  Van provides superb flexibility for bulky items such as
                  furniture and crates. Unlike panel vans, the entire load space
                  is above the rear wheels, so the internal wheel arches don't
                  interfere with your loading space. There is no better van for
                  fitting everything in on your moving day.
                </p>
                <ol>
                  <li>
                    <b>Length:</b> 4.0 m / 13.1 ft
                  </li>
                  <li>
                    <b>Width:</b> 2.0 m / 6.5 ft{" "}
                  </li>
                  <li>
                    <b>Height:</b> 2.2 m / 7.2 ft{" "}
                  </li>
                  <li>
                    <b>Payload:</b> 1200-1600 kg
                  </li>
                  <li>
                    <b>Seats (inc driver):</b> 3
                  </li>
                </ol>
              </div>
              <div className="popup-image">
                <img
                  src="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519469/removal/luton.jpg"
                  alt="LUTONVAN"
                />
              </div>
            </div>
            {/* large */}
            <div className="popup-content">
              <div className="popuptext">
                <h2>
                  Typical Large (Long Wheel Base) Van Load Space Specifications
                </h2>
                <p>
                  The LWB High Top Van offers a larger internal load space than
                  any other panel van on the road and comes with a side loading
                  door allowing for easy loading and unloading in tight
                  locations, making this Van perfect for 1 -2 bedroom flat
                  moves, business to business deliveries, removal service and
                  local storage/store collections. By far the most popular van
                  in the Man and Van services industry and used by removals
                  companies everywhere.
                </p>
                <ol>
                  <li>
                    <b>Length:</b> 3.4 m / 11.1 ft
                  </li>
                  <li>
                    <b>Width:</b> 1.7 m / 5 ft{" "}
                  </li>
                  <li>
                    <b>Height:</b> 1.7 m / 5 ft{" "}
                  </li>
                  <li>
                    <b>Payload:</b> 1200-1500 kg
                  </li>
                  <li>
                    <b>Seats (inc driver):</b> 3
                  </li>
                </ol>
              </div>
              <div className="popup-image">
                <img
                  src="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519468/removal/large.jpg"
                  alt="Large Van"
                />
              </div>
            </div>
            {/* medium */}
            <div className="popup-content">
              <div className="popuptext">
                <h2>Typical Medium Van Load Space Specifications</h2>
                <p>
                  The Medium Van offers a usefully Large load area without being
                  much longer or wider than a large car. The perfect solution
                  for transporting two peoples belongings, pieces of furniture
                  or sofa collections.
                </p>
                <ol>
                  <li>
                    <b>Length:</b> 2.4 m / 7.8 ft
                  </li>
                  <li>
                    <b>Width:</b> 1.7 m / 5 ft{" "}
                  </li>
                  <li>
                    <b>Height:</b> 1.4 m / 4 ft{" "}
                  </li>
                  <li>
                    <b>Payload:</b> 1200 kg
                  </li>
                  <li>
                    <b>Seats (inc driver):</b> 3
                  </li>
                </ol>
              </div>
              <div className="popup-image">
                <img
                  src="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519468/removal/medium.jpg"
                  alt="Medium Van"
                />
              </div>
            </div>
            {/* small */}
            <div className="popup-content">
              <div className="popuptext">
                <h2>Typical Small Van Load Space Specifications</h2>
                <p>
                  The Small Van is most commonly used for luggage and parcel
                  transfers, small vans can hold up to 8 packed suitcases. This
                  is the perfect van hire for a solo individual being the
                  perfect van size for 1 person's luggage and easy parking.
                </p>
                <ol>
                  <li>
                    <b>Length:</b> 1.2 m / 3.5 ft
                  </li>
                  <li>
                    <b>Width:</b> 1.49 m / 4.8 ft{" "}
                  </li>
                  <li>
                    <b>Height:</b> 1.2 m / 3.9 ft{" "}
                  </li>
                  <li>
                    <b>Payload:</b> 600-900 kg
                  </li>
                  <li>
                    <b>Seats (inc driver):</b> 2
                  </li>
                </ol>
              </div>
              <div className="popup-image">
                <img
                  src="https://res.cloudinary.com/dsigqr3ht/image/upload/v1702519468/removal/small.jpg"
                  alt="Small Van"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VanSizeGuidePopup;
