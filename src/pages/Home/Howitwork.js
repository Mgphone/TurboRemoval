import React from "react";
import { BsLaptop } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { PiVanFill } from "react-icons/pi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Howitwork() {
  return (
    <div className="howitwork">
      <h1>How We Work</h1>

      <div className="howitworkcards">
        <Carousel
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
          interval={2000}
          showStatus={true}
        >
          <div className="howitworkcard">
            <BsLaptop
              className="howitwork-icon"
              // size={100}
              color="rgb(136, 136, 188)"
            />
            <div className="howitworkdescription">
              <h4>Step1 Search Quote</h4>

              <p> Discover inspiration and wisdom in concise</p>
            </div>
          </div>

          <div className="howitworkcard">
            <AiFillCreditCard
              className="howitwork-icon"
              // size={100}
              color="rgb(136, 136, 188)"
            />
            <div className="howitworkdescription">
              <h4>Step2 Book</h4>

              <p>Secure your spot with ease, making your plans a reality</p>
            </div>
          </div>

          <div className="howitworkcard">
            <PiVanFill
              className="howitwork-icon"
              // size={100}
              color="rgb(136, 136, 188)"
            />
            <div className="howitworkdescription">
              <h4>Step3 Move</h4>

              <p>
                Take a load off, unwind, and entrust it to the company's capable
                hands.
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Howitwork;
