import React from "react";

function MovingDate() {
  return (
    <>
      <div className="movingdate">
        <div className="movidedate-header">
          <h1>When you're moving</h1>
          <p>
            Tell us when you're moving so we can check and guarantee the drivers
            availability.
          </p>
          <h5>
            Please note, any specialist items (such as pianos) will require an
            expert team. Please contact us via Instant Support to discuss these.
          </h5>
        </div>
        <div className="movingdate-description">
          <h3>
            I am planning to move on <input type="text" /> at{" "}
            <label htmlFor="movingdate-choosehour">
              I need this Vehicle For
            </label>
            <select id="movingdate-choosehour">
              <option value="1">00:00</option>
              <option value="2">1:00</option>
              <option value="3">2:00</option>
            </select>
          </h3>
        </div>
      </div>
    </>
  );
}

export default MovingDate;
