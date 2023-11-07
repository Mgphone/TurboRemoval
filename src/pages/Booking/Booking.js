import React, { useState, useContext } from "react";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import "./Booking.css";
import { useLocation } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import MyContext from "../../context/MyContext";
function Booking() {
  // const [finalLocation, setfinalLocation] = useState("");
  // const [finalDestination, setfinalDestination] = useState("");
  // const { location, destination } = useParams();
  const { data } = useContext(MyContext);
  // console.log("this is for address" + JSON.stringify(data.addresses));
  // console.log("this is the whole data" + JSON.stringify(data));
  // const allLocations = data.addresses.map((output) => output.location);
  // console.log("this is all location" + allLocations);
  const location = new URLSearchParams(useLocation().search).get(
    "yourlocation"
  );
  const destination = new URLSearchParams(useLocation().search).get(
    "destination"
  );
  const changeLocation = () => {
    console.log("will update later");
  };
  const changeDestination = (e) => {
    console.log("will update later ");
  };
  // const location = new URLSearchParams(useParams().search).get("location");
  // console.log("location from booking" + location);
  return (
    <>
      <Nav />
      <div className="booking-container">
        {/* this is booking header */}
        <div className="booking-header">
          <h1>Your Man And Van quote could be as little as:</h1>
          <br />
          <h2>Which vehicle do you need?</h2>
          <p>
            It is important that you select the correct vehicle for the amount
            that you wish to move. Please be sure to consult our Size Guide for
            advice on the size of vehicle that would be suitable for you. Need
            help choosing which vehicle? Use our Van Size Calculator!
          </p>
          <button>Van Size Calculator</button>
        </div>
        {/* this is your location{data.addresses} */}
        {/* this is your destination{data.addresses[1]} */}
        {/* this is start for choose vansize */}
        <div className="choosevansize">
          <h1>Choose your vansize</h1>
          <div className="booking-vansize">
            <div className="readio-container">
              <label className="radio-label" htmlFor="small">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  type="radio"
                  className="radio-input"
                  name="vansize"
                  value="small"
                  id="small"
                />
                <p>Small Van</p>
              </label>
            </div>
            <div className="readio-container">
              <label className="radio-label" htmlFor="medium">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  type="radio"
                  className="radio-input"
                  name="vansize"
                  value="medium"
                  id="medium"
                />
                <p>Medium Van</p>
              </label>
            </div>
            <div className="readio-container">
              <label className="radio-label" htmlFor="large">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  id="large"
                  type="radio"
                  className="radio-input"
                  name="vansize"
                  value="large"
                  defaultChecked
                />
                <p>Large Van</p>
              </label>
            </div>
            <div className="readio-container">
              <label className="radio-label" htmlFor="luton">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  id="luton"
                  type="radio"
                  className="radio-input"
                  name="vansize"
                  value="luton"
                />
                <p>Luton Giant</p>
              </label>
            </div>
          </div>
        </div>
        {/* this is loading person and people */}
        <div className="bookingloading">
          <div className="loading-header">
            <h1>Will you need help with loading and unloading?</h1>
            <p>
              Our drivers will be happy to help you with your move, and we can
              also provide extra people if you'd like to make your move a bit
              quicker.
            </p>
          </div>
          <div className="booking-loading">
            <div className="readio-container">
              <label className="radio-label" htmlFor="nohelp">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  type="radio"
                  className="radio-input"
                  name="loading"
                  value="nohelp"
                  id="nohelp"
                />
                <p>No Help</p>
              </label>
            </div>
            <div className="readio-container">
              <label className="radio-label" htmlFor="driverhelp">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  type="radio"
                  className="radio-input"
                  name="loading"
                  value="driverhelp"
                  id="driverhelp"
                  defaultChecked
                />
                <p>Driver Help</p>
              </label>
            </div>
            <div className="readio-container">
              <label className="radio-label" htmlFor="driverplusone">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  type="radio"
                  className="radio-input"
                  name="loading"
                  value="driverplusone"
                  id="driverplusone"
                />
                <p>Driver Plus One</p>
              </label>
            </div>
            <div className="readio-container">
              <label className="radio-label" htmlFor="driverplustwo">
                <img src="https://picsum.photos/200" alt="lorem" />
                <input
                  type="radio"
                  className="radio-input"
                  name="loading"
                  value="driverplustwo"
                  id="driverplustwo"
                />
                <p>Driver Plus Two</p>
              </label>
            </div>
          </div>
        </div>
        {/* checking can travel or not */}
        <div className="canitravel">
          <h1>Can I travel in the van?</h1>
          <p>
            We cannot guarantee the driver will have space to allow you to
            travel in the van with them. Please contact the driver in advance to
            confirm space and availability.
          </p>
        </div>
        {/* This is for where you are moving */}
        <div className="wheremoving">
          <div className="wheremoving-header">
            <h1>Where you're moving</h1>
            <p>
              Your Man and Van quotes depend on the total mileage of the move
              and how much work needs to be carried out at each end of the move.
              Things like stairs might increase the prices so it’s important
              that we know everything so that we can give you accurate quotes.
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
              <Autocomplete>
                <input
                  type="text"
                  placeholder="PostCode"
                  value={location}
                  onChange={(e) => changeLocation(e.target.value)}
                />
              </Autocomplete>

              <label htmlFor="StreetAddress">StreetAddress</label>
              <input
                type="text"
                placeholder="StreetAddress"
                value={location}
                readOnly
              />

              {/* <label htmlFor="city">City</label>
              <input type="text" placeholder="City" /> */}

              <label htmlFor="StairFlight">Choose Stair of Flight</label>
              <select id="StairFlight">
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
            <button>Add Via Stop</button>
            <div className="delivery">
              <h1>Delivery</h1>
              <label htmlFor="Postcode">PostCode</label>
              <input
                type="text"
                placeholder="PostCode"
                value={destination}
                onChange={changeDestination}
              />

              <label htmlFor="StreetAddress">StreetAddress</label>
              <input type="text" placeholder="StreetAddress" />

              <label htmlFor="city">City</label>
              <input type="text" placeholder="City" />

              <label htmlFor="StairFlight">Choose Stair of Flight</label>
              <select id="StairFlight">
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
        </div>
        {/* hour need and time */}
        <div className="mileandhour">
          <h1>How many hours do you want the vehicle for?</h1>
          <p>
            We estimate that your move will take around 4 hours, 47 minutes, if
            you think it will take less time you can reduce the number of hours.
            If you do need more time on the day all of our drivers have a pay as
            you go rate.
          </p>
          <label htmlFor="choosehour">I need this Vehicle For</label>
          <select id="choosehour">
            <option value="1">I need this for half an Hour</option>
            <option value="2">I need this for an Hour</option>
            <option value="3">I need this for an Hour and half</option>
          </select>
        </div>
        <div className="movingdate">
          <div className="movidedate-header">
            <h1>When you're moving</h1>
            <p>
              Tell us when you're moving so we can check and guarantee the
              drivers availability.
            </p>
            <h5>
              Please note, any specialist items (such as pianos) will require an
              expert team. Please contact us via Instant Support to discuss
              these.
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
        <div className="aboutyou">
          <div className="aboutyou-header">
            <h1>About you</h1>
            <p>
              We ask for your details so that we can send you a text with a link
              to your quotes. When you book we'll send a confirmation email and
              pass your name, email address and phone number to the driver you
              choose.
            </p>
          </div>
          <div className="aboutyou-info">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="name" />
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="email" />
            <label htmlFor="phonenumber">Phone</label>
            <input type="text" placeholder="phone" />
          </div>
        </div>
        <button>Get Free Quote</button>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
