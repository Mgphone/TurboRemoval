import React, { useEffect, useState } from "react";
import vanSizes from "../../data/vanSizes";
import helperImages from "../../data/helperImages";
function VanSizeRadio({ id, value, label, imageSrc, checked, onChange }) {
  const [isHover, setIsHover] = useState(false);
  const [hoverContent, setHoverContent] = useState(null);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handleTouchStart = () => {
    setIsHover(true);
  };
  const handleTouchEnd = () => {
    setIsHover(false);
  };
  const fetchData = async () => {
    if (isHover) {
      const hoverValue = value;
      if (["Small", "Medium", "Large", "Luton"].includes(hoverValue)) {
        const hoverItem = vanSizes.find((item) => item.id === hoverValue);
        setHoverContent(hoverItem ? hoverItem.specifications : null);
      } else if (
        [
          "No-Help",
          "Driver-Help",
          "Driver-Plus-One",
          "Driver-Plus-Two",
        ].includes(hoverValue)
      ) {
        const hoverItem = helperImages.find((item) => item.id === hoverValue);
        setHoverContent(hoverItem ? hoverItem.about : null);
      }
    } else {
      setHoverContent(null);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isHover, value, vanSizes, helperImages]);
  return (
    <>
      <div className={`radio-container ${checked ? "active-radio" : ""}`}>
        <label
          className="radio-label"
          htmlFor={id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* {hoverContent && <div>{JSON.stringify(hoverContent)}</div>} */}
          {hoverContent && (
            <>
              {typeof hoverContent === "object" ? (
                <>
                  {Object.entries(hoverContent).map(([key, value]) => (
                    <p className="readiodisplay" key={key}>
                      {key}:{value}
                    </p>
                  ))}
                </>
              ) : (
                <>
                  <p className="readiodisplay">{hoverContent}</p>
                </>
              )}
            </>
          )}
          <div className="radio-image-container">
            <img src={imageSrc} alt={label} />
          </div>
          <input
            type="radio"
            className="radio-input"
            name={label}
            id={id}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
          />
          <p>{label}</p>
        </label>
      </div>
    </>
  );
}

export default VanSizeRadio;
