import React from "react";
import { FaStar } from "react-icons/fa";
import reviews from "../../data/review";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function Review() {
  const StarRating = ({ rating }) => {
    const stars = Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} color="gold" />
    ));

    return <div>{stars}</div>;
  };

  const itemsGroups = [];
  for (let i = 0; i < reviews.length; i += 3) {
    itemsGroups.push(reviews.slice(i, i + 3));
  }
  return (
    <>
      <div className="review-cards">
        <Carousel showArrows={true} showThumbs={false}>
          {itemsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.map((item, itemIndex) => (
                <div key={itemIndex} className="carousel-item">
                  {/* Display your item properties here */}
                  <div className="review-card" key={item.No}>
                    <StarRating rating={item.Star} />
                    <h3>{item.Comment.substring(0, 15) + "..."}</h3>
                    <p>{item.Comment}</p>
                    <hr />
                  </div>
                  {/* <div>Star: {item.Star}</div>
                  <div>Comment: {item.Comment}</div> */}
                  {/* You can customize the rendering of the properties */}
                </div>
              ))}
            </div>
          ))}
        </Carousel>
        {/* {reviews.map((review) => (
          <div className="review-card" key={review.No}>
            <StarRating rating={review.Star} />
            <h3>{review.Comment.substring(0, 15) + "..."}</h3>
            <p>{review.Comment}</p>
            <br />
          </div>
        ))} */}
      </div>
    </>
  );
}

export default Review;
