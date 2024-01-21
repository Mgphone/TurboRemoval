import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/MyContext";
// import { Autocomplete } from "@react-google-maps/api";
import BetweenStops from "./BetweenStops";
import "./Booking.css";
import BetweenMoving from "./BetweenStop/BetweenMoving";
function WhereMoving() {
  const { data, setData } = useContext(MyContext);
  const checkCollectandDesti = data.addresses;
  const arrayLength = checkCollectandDesti.length;
  // useEffect(() => {
  //   console.log("This is log from whereemoving" + JSON.stringify(data));
  // }, [data]);
  // this is for pickup address
  const changeLocation = (e) => {
    const updatedAddresses = [...checkCollectandDesti];
    updatedAddresses[0].stair = e.target.value;
    setData((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));
  };
  const changePhysicalAddressPickup = (e) => {
    const updatedAddresses = [...checkCollectandDesti];
    updatedAddresses[0].physicalAddress = e.target.value;
    setData((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));
  };
  /// this is for delivery address
  const changeDestination = (e) => {
    const updatedAddresses = [...checkCollectandDesti];
    updatedAddresses[updatedAddresses.length - 1].stair = e.target.value;
    // setData({ ...data, addresses: updatedAddresses });
    setData((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));
  };

  const changePhysicalAddressDeliver = (e) => {
    const updatedAddresses = [...checkCollectandDesti];
    updatedAddresses[updatedAddresses.length - 1].physicalAddress =
      e.target.value;
    setData((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));
  };
  //betweenstops form
  const [between, setBetween] = useState("");
  const handleBetweenStops = (updateForm) => {
    setBetween(updateForm);
  };

  const handleMovingForm = (e) => {
    e.preventDefault();
    let viaBetween = between.viaStopsData;

    if (
      checkCollectandDesti.length >= 2 &&
      typeof between.viaStopsData !== "undefined"
    ) {
      setData((prevState) => {
        //filter out all the viastop with
        const updatedAddresses = prevState.addresses.filter((address) => {
          return !(address && address.id && address.id.startsWith("viaStop"));
        });

        const updateArray = [
          ...updatedAddresses.slice(0, 1),
          ...viaBetween,
          ...updatedAddresses.slice(1),
        ];

        //update usecontext
        return {
          ...prevState,
          addresses: updateArray,
        };
      });
    } else {
      console.log(
        "There is  only two locations and destination",
        JSON.stringify(data)
      );
    }
  };
  //add via button

  return (
    <>
      <div className="wheremoving">
        <div className="wheremoving-header">
          <h2>Where you're moving</h2>
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
            stop’ feature. Aa soon as you add or remove please make sure to
            confirm it
          </p>
        </div>
        {/* <form className="wheremoving-form" onSubmit={handleMovingForm}> */}
        <div className="wheremoving-form">
          {
            checkCollectandDesti.length >= 2 ? (
              <>
                <div className="wheremoving-form-title">
                  <h2>Collection address</h2>
                </div>
                <div className="collection">
                  <div>
                    <label htmlFor="collection Address">Address</label>
                    <input
                      id="collectioninput"
                      name="collectioninput"
                      value={checkCollectandDesti[0].location}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Collection User Enter">
                      Building Address
                    </label>
                    <input
                      placeholder="Enter Your Physical Address"
                      required
                      onChange={changePhysicalAddressPickup}
                    />
                  </div>
                  <div>
                    <label htmlFor="StairFlight">Stairs</label>
                    <select
                      id="StairFlight"
                      name="collection"
                      required
                      onChange={changeLocation}
                    >
                      <option value="">Select Flight of Stair</option>
                      <option value="0">Elevator Available</option>
                      <option value="0">No Flight of Stair</option>
                      <option value="1">1 Flight of Stair</option>
                      <option value="2">2 Flight of Stair</option>
                      <option value="3">3 Flight of Stair</option>
                      <option value="4">4 Flight of Stair</option>
                      <option value="5">5 Flight of Stair</option>
                      <option value="6">6 Flight of Stair</option>
                      <option value="7">7 Flight of Stair</option>
                      <option value="8">8 Flight of Stair</option>
                    </select>
                  </div>
                </div>
                {/* add via stops */}
                {/* <BetweenStops onFormChange={handleBetweenStops} /> */}
                <BetweenMoving />
                <div className="wheremoving-form-title">
                  <h2>Delivery address</h2>
                </div>
                <div className="destination">
                  <div>
                    <label htmlFor="destinatin Address">Address</label>
                    <input
                      name="deliveryinput"
                      value={checkCollectandDesti[arrayLength - 1].location}
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="Address_ReadOnly">Address</label>
                    <input
                      value={checkCollectandDesti[arrayLength - 1].location}
                      readOnly
                    />
                  </div> */}
                  <div>
                    <label htmlFor="Delvery User Enter">Building Address</label>
                    <input
                      placeholder="Enter Your Physical Address"
                      required
                      onChange={changePhysicalAddressDeliver}
                    />
                  </div>
                  <div>
                    <label htmlFor="StairFlight">Stairs</label>
                    <select
                      id="StairFlight"
                      name="destination"
                      required
                      onChange={changeDestination}
                    >
                      <option value="">Select Flight of Stair</option>
                      <option value="0">Elevator Available</option>
                      <option value="0">No Flight of Stair</option>
                      <option value="1">1 Flight of Stair</option>
                      <option value="2">2 Flight of Stair</option>
                      <option value="3">3 Flight of Stair</option>
                      <option value="4">4 Flight of Stair</option>
                      <option value="5">5 Flight of Stair</option>
                      <option value="6">6 Flight of Stair</option>
                      <option value="7">7 Flight of Stair</option>
                      <option value="8">8 Flight of Stair</option>
                    </select>
                  </div>
                </div>
                {/* <button
                  className="collection-submitbutton"
                  onClick={handleMovingForm}
                >
                  Submit
                </button> */}
                {/* <button type="submit">Submit</button> */}
              </>
            ) : null

            /* <div>
              <div className="collection">
                <h1>Collection</h1>
                <label htmlFor="Postcode">PostCode</label>
                <Autocomplete>
                  <input
                    type="text"
                    placeholder="PostCode"
                    name="collectioninput"
                    // value={location}
                    onChange={(e) => changeLocation(e.target.value)}
                  />
                </Autocomplete>

                <label htmlFor="Address">Address</label>
                <input type="text" placeholder="Address" readOnly />
                <label htmlFor="StairFlight">Choose Stair of Flight</label>
                <select id="StairFlight" name="collection" required>
                  <option value="">Select Flight of Stair</option>
                  <option value="0">No Flight of Stair</option>
                  <option value="1">1 Flight of Stair</option>
                  <option value="2">2 Flight of Stair</option>
                  <option value="3">3 Flight of Stair</option>
                  <option value="4">4 Flight of Stair</option>
                  <option value="5">5 Flight of Stair</option>
                  <option value="6">6 Flight of Stair</option>
                  <option value="7">7 Flight of Stair</option>
                  <option value="8">8 Flight of Stair</option>
                </select>
              </div>
              <button type="button" onClick={addvia}>
                Add Via Stop
              </button>
              <div className="delivery">
                <h1>Delivery</h1>
                <label htmlFor="Postcode">PostCode</label>
                <Autocomplete>
                  <input
                    type="text"
                    placeholder="PostCode"
                    name="deliveryinput"
                    // value={destination}
                    onChange={changeDestination}
                  />
                </Autocomplete>
                <label htmlFor="Address">Address</label>
                <input type="text" placeholder="Address" readOnly />
                <label htmlFor="StairFlight">Choose Stair of Flight</label>
                <select id="StairFlight" name="delivery" required>
                  <option value="">Select Flight of Stair</option>
                  <option value="0">No Flight of Stair</option>
                  <option value="1">1 Flight of Stair</option>
                  <option value="2">2 Flight of Stair</option>
                  <option value="3">3 Flight of Stair</option>
                  <option value="4">4 Flight of Stair</option>
                  <option value="5">5 Flight of Stair</option>
                  <option value="6">6 Flight of Stair</option>
                  <option value="7">7 Flight of Stair</option>
                  <option value="8">8 Flight of Stair</option>
                </select>
              </div>
              <button type="submit">Submit</button>
            </div> */
          }
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

export default WhereMoving;
