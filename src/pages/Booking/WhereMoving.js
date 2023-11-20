import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/MyContext";
// import { Autocomplete } from "@react-google-maps/api";
import BetweenStops from "./BetweenStops";
function WhereMoving() {
  const { data, setData } = useContext(MyContext);
  const checkCollectandDesti = data.addresses;
  const arrayLength = checkCollectandDesti.length;

  useEffect(() => {
    console.log(
      "Checking how is data look alike with useeffect",
      JSON.stringify(data)
    );
  }, [data]);

  const changeLocation = (e) => {
    // const updatedAddresses = [...checkCollectandDesti];
    // updatedAddresses[0].stair = e.target.value;
    // setData({ ...data, addresses: updatedAddresses });
    const updatedAddresses = [...checkCollectandDesti];
    updatedAddresses[0].stair = e.target.value;

    setData((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));

    // console.log("checking from changeLocation" + JSON.stringify(data));
  };

  const changeDestination = (e) => {
    const updatedAddresses = [...checkCollectandDesti];
    updatedAddresses[updatedAddresses.length - 1].stair = e.target.value;
    // setData({ ...data, addresses: updatedAddresses });
    setData((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));
    // console.log("checking from changedestination" + JSON.stringify(data));
  };

  //betweenstops form
  const [between, setBetween] = useState("");
  const handleBetweenStops = (updateForm) => {
    setBetween(updateForm);
  };
  //main form

  const handleMovingForm = (e) => {
    e.preventDefault();
    const viaBetween = between.viaStopsData;
    console.log("Thisis viabetween" + viaBetween);

    if (checkCollectandDesti.length >= 2 && typeof viaBetween !== "undefined") {
      let newArray = [
        ...checkCollectandDesti.slice(0, 1),
        ...viaBetween,
        ...checkCollectandDesti.slice(1),
      ];
      // newArray = newArray.map((item) =>
      //   item.id === viaBetween.id ? viaBetween : item
      // );

      const isDuplicate = newArray.some((item) => item.id === viaBetween.id);
      if (isDuplicate) {
        newArray = newArray.map((item) =>
          item.id === newArray.id ? newArray : item
        );
        setData((prevState) => ({
          ...prevState,
          addresses: newArray,
        }));
      } else {
        setData((prevState) => ({
          ...prevState,
          addresses: newArray,
        }));
      }

      console.log("This is new array to add", JSON.stringify(data));
    } else {
      console.log(
        "else only two location and destination",
        JSON.stringify(data)
      );
    }
  };

  //add via button

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
            stop’ feature. Aa soon as you add or remove please make sure to
            confirm it
          </p>
        </div>
        <form className="wheremoving-form" onSubmit={handleMovingForm}>
          {
            checkCollectandDesti.length >= 2 ? (
              <>
                <div>
                  <div className="collection">
                    <label htmlFor="collection Address">Address</label>
                    <input
                      name="collectioninput"
                      value={checkCollectandDesti[0].location}
                      required
                    />
                    <label htmlFor="Address_ReadOnly">Address</label>
                    <input value={checkCollectandDesti[0].location} readOnly />
                    <label htmlFor="StairFlight">Choose Stair of Flight</label>
                    <select
                      id="StairFlight"
                      name="collection"
                      required
                      onChange={changeLocation}
                    >
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
                  <BetweenStops onFormChange={handleBetweenStops} />
                  <div className="destination">
                    <label htmlFor="destinatin Address">Address</label>
                    <input
                      name="deliveryinput"
                      value={checkCollectandDesti[arrayLength - 1].location}
                    />
                    <label htmlFor="Address_ReadOnly">Address</label>
                    <input
                      value={checkCollectandDesti[arrayLength - 1].location}
                      readOnly
                    />
                    <label htmlFor="StairFlight">Choose Stair of Flight</label>
                    <select
                      id="StairFlight"
                      name="destination"
                      required
                      onChange={changeDestination}
                    >
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
                </div>
                <button type="submit">Submit</button>
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
        </form>
      </div>
    </>
  );
}

export default WhereMoving;
