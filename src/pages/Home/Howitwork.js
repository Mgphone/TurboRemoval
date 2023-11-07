import React from "react";
import { BsLaptop } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { PiVanFill } from "react-icons/pi";
function Howitwork() {
  return (
    <div className="howitwork">
      <h1>How We Work</h1>

      <div className="howitworkcards">
        <div className="howitworkcard">
          <BsLaptop size={100} color="rgb(136, 136, 188)" />
          <div className="howitworkdescription">
            <h4>Step1 Search Quote</h4>
            <br />
            <p> Discover inspiration and wisdom in concise</p>
          </div>
        </div>

        <div className="howitworkcard">
          <AiFillCreditCard size={100} color="rgb(136, 136, 188)" />
          <div className="howitworkdescription">
            <h4>Step2 Book</h4>
            <br />
            <p>Secure your spot with ease, making your plans a reality</p>
          </div>
        </div>

        <div className="howitworkcard">
          <PiVanFill size={100} color="rgb(136, 136, 188)" />
          <div className="howitworkdescription">
            <h4>Step3 Move</h4>
            <br />
            <p>
              Take a load off, unwind, and entrust it to the company's capable
              hands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Howitwork;
