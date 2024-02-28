import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useParams } from "react-router-dom";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import StickyBookNow from "../../../component/StickyBookNow";
import servicesprovided from "../../../data/servicesprovided";
import "./locationcomponet.css";
const containerStyle = {
  width: "100%",
  height: "400px",
};
function LocationComponent({ postalAndServices }) {
  const servicTitle = servicesprovided.map((item) => item.Title.toLowerCase());
  const checker = postalAndServices.replace(/-/g, " ");
  // const returnResult = "";
  const id = servicTitle
    .map((item) =>
      checker.startsWith(item)
        ? checker
            .replace(item, "")
            .trim()
            .replace(/\b\w/g, (match) => match.toUpperCase())
        : null
    )
    .find((item) => item && item.length > 0);
  console.log("This is id from LocationCOmponent " + id);
  const service = servicTitle
    .find((item) => checker.startsWith(item))
    .replace(/\b\w/g, (match) => match.toUpperCase());

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const onLoad = (map) => {
    setMap(map);
  };
  const onUnmount = () => {
    setMap(null);
  };
  useEffect(() => {
    console.log("fetching");
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${id}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&components=country:GB`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCenter({ lat, lng });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [id]);
  return (
    <>
      <Nav />

      <div className="locationlocalpage">
        <NavLink to="/">
          <button>Book Now</button>
        </NavLink>
        <h1>
          Welcome to [Turbo Removals] {service} {id}
        </h1>

        <p>
          Are you planning a move within or around the vibrant [{service} {id}]?
          Look no further! Our man and van services are meticulously designed to
          cater to the unique demands of our community, providing an
          unparalleled moving experience. Here's a detailed look at why our
          services are the ideal choice for your relocation needs:
        </p>

        <h2>
          1. Local Expertise: Navigating [{service} {id}] with Precision
        </h2>
        <p>
          Our team is deeply ingrained in the local landscape, possessing an
          intimate understanding of the streets, neighborhoods, and traffic
          patterns specific to [{service} {id}]. This local expertise allows us
          to plan your move strategically, ensuring the most efficient routes
          and minimizing any potential logistical challenges.
        </p>

        <h2>2. Timely and Reliable: Punctuality You Can Trust</h2>
        <p>
          We understand that time is of the essence during a move. Our
          commitment to timeliness is not just a promise; it's a guarantee. From
          meticulous packing to secure transportation, every step of your move
          is orchestrated with precision, ensuring your belongings arrive at
          their destination exactly when promised.
        </p>

        <h2>3. Tailored Solutions:</h2>
        <p>
          {" "}
          Personalized Service for Every Move Recognizing that each move is
          unique, our services are highly adaptable and can be personalized to
          suit the specific requirements of your relocation. Whether you're
          moving from a cozy apartment or a spacious family home, our
          comprehensive suite of moving solutions is tailored to ensure a
          stress-free and seamless experience.{" "}
        </p>
        <h2>4. Competitive Pricing:</h2>
        <p>
          {" "}
          Exceptional Service Without Breaking the Bank Quality service
          shouldn't come with a hefty price tag. Our transparent pricing model
          eliminates hidden fees, providing you with a clear understanding of
          the costs associated with your move. We strive to offer competitive
          rates that align with your budget while maintaining the highest
          standards of service, professionalism, and care.
        </p>
        <h2> 5. Professional and Friendly Team: </h2>
        <p>
          Beyond Logistics, a Personal Touch Moving is a personal journey, and
          our team understands the importance of a friendly and professional
          touch. Beyond their expertise in the logistics of moving, our team
          members are dedicated to providing excellent customer service,
          ensuring your moving experience is not only efficient but also
          enjoyable.{" "}
        </p>
        <h2>6. Safety First: </h2>
        <p>
          Preserving Your Belongings with Meticulous Care The safety of your
          belongings is our top priority. Our meticulous packing methods,
          coupled with the use of high-quality materials, guarantee that your
          items will arrive at your new destination in the same condition in
          which they left. Our secure transportation practices provide peace of
          mind throughout the entire process.
        </p>
        <h2> 7. Customer Satisfaction:</h2>
        <p>
          {" "}
          Our Track Record Speaks Volumes Our proudest achievement is the
          satisfaction of our customers. Positive reviews and heartfelt
          testimonials from our clients underscore our commitment to exceeding
          expectations and ensuring your complete satisfaction with every facet
          of your move.{" "}
        </p>

        <p>
          For a moving experience that transcends the ordinary, entrust your
          relocation to our man and van services in [{service} {id}]. Contact us
          today to experience meticulous attention to detail, personalized care,
          and an unwavering commitment to excellence.
        </p>

        <p>
          <strong>[Turbo Removals]</strong> - Moving You with Precision and
          Care.
        </p>

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            options={{
              gestureHandling: "none",
              streetViewControl: false,
              mapTypeControl: false,
            }}
            onUnmount={onUnmount}
          ></GoogleMap>
        ) : (
          <p>Loading...</p>
        )}
        <NavLink to="/">
          <button>Book Now</button>
        </NavLink>
      </div>
      <StickyBookNow />
      <Footer />
    </>
  );
}

export default LocationComponent;
