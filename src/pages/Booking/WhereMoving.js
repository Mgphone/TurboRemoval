import React from "react";

function WhereMoving() {
  const changeLocation = () => {
    console.log("will update later");
  };
  const changeDestination = (e) => {
    console.log("will update later ");
  };
  return (
    <>
      <div className="wheremoving">
        <div className="wheremoving-header">
          <h1>Where you're moving</h1>
          <p>
            Your Man and Van quotes depend on the total mileage of the move and
            how much work needs to be carried out at each end of the move.
            Things like stairs might increase the prices so it’s important that
            we know everything so that we can give you accurate quotes.
          </p>
          <br />
          <p>
            Please note:If the driver needs to make multiple trips, or go via
            another address, please add all journeys in below using the ‘add
            stop’ feature.
          </p>
        </div>
        <div className="wheremoving-form">
          <div className="collection">
            <h1>Collection</h1>
            <label htmlFor="Postcode">PostCode</label>

            <input
              type="text"
              placeholder="PostCode"
              // value={location}
              // onChange={(e) => changeLocation(e.target.value)}
            />

            <label htmlFor="StreetAddress">Address</label>
            <input type="text" placeholder="StreetAddress" readOnly />

            {/* <label htmlFor="city">City</label>
              <input type="text" placeholder="City" /> */}

            <label htmlFor="StairFlight">Choose Stair of Flight</label>
            <select id="StairFlight" required>
              <option value="" disabled>
                Select Flight of Stair
              </option>
              <option value="0">No Flight of Stair</option>
              <option value="1">1 Flight of Stair</option>
              <option value="2">2 Flight of Stair</option>
              <option value="3">3 Flight of Stair</option>
              <option value="4">4 Flight of Stair</option>
              <option value="5">5 Flight of Stair</option>
              <option value="6">6 Flight of Stair</option>
              <option value="7">7 Flight of Stair</option>
              <option value="8">8 Flight of Stair</option>
              <option value="0">Lift No Need Stair</option>
            </select>
          </div>
          <button>Add Via Stop</button>
          <div className="delivery">
            <h1>Delivery</h1>
            <label htmlFor="Postcode">PostCode</label>
            <input
              type="text"
              placeholder="PostCode"
              // value={destination}
              // onChange={changeDestination}
            />

            <label htmlFor="Address">Address</label>
            <input type="text" placeholder="StreetAddress" readOnly />

            <label htmlFor="StairFlight">Choose Stair of Flight</label>
            <select id="StairFlight" required>
              <option value="" disabled>
                Select Flight of Stair
              </option>
              <option value="0">No Flight of Stair</option>
              <option value="1">1 Flight of Stair</option>
              <option value="2">2 Flight of Stair</option>
              <option value="3">3 Flight of Stair</option>
              <option value="4">4 Flight of Stair</option>
              <option value="5">5 Flight of Stair</option>
              <option value="6">6 Flight of Stair</option>
              <option value="7">7 Flight of Stair</option>
              <option value="8">8 Flight of Stair</option>
              <option value="0">Lift No Need Stair</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhereMoving;
