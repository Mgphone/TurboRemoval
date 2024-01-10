import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
// import reviews from "../../data/review";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function Review() {
  const [reviews, setReviews] = useState(false);
  const fetchReview = async () => {
    try {
      // const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.REACT_APP_PLACE_ID}&fields=reviews&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      // const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.REACT_APP_PLACE_ID}&fields=reviews&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      const url = `${process.env.REACT_APP_SERVER_URL}google/review`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fail to fetch");
      }
      const data = await response.json();
      if (data.result && data.result.reviews) {
        setReviews(data.result.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);
  const StarRating = ({ rating }) => {
    const stars = Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} color="gold" />
    ));

    return <div>{stars}</div>;
  };

  const itemsGroups = [];
  for (let i = 0; i < reviews.length; i += 1) {
    itemsGroups.push(reviews.slice(i, i + 1));
  }
  const changeTime = (timestamp) => {
    // Replace the timestamp with your Unix timestamp
    // const timestamp = 1643456650;

    // Create a new Date object using the timestamp
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    // Get the individual components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Create a string representation of the date and time
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } ${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;

    return formattedDate;
  };
  return (
    <>
      <div className="review-container">
        <h1>Our Review</h1>
        <div className="review-cards">
          {reviews.length > 0 && (
            <Carousel showThumbs={false} infiniteLoop={true} interval={3000}>
              {reviews.map((item, index) => (
                <div className="review-card" key={index}>
                  <StarRating rating={item.rating} />
                  <p>{item.author_name}</p>
                  <p>{changeTime(item.time)}</p>
                  <img
                    src={item.profile_photo_url}
                    alt={`pict of${item.author_name}`}
                  />
                  <h3>{item.text}</h3>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </>
  );
}

export default Review;
