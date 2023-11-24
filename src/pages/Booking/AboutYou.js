import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
function AboutYou() {
  const { data, setData } = useContext(MyContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };
  return (
    <>
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
          <input
            type="text"
            placeholder="name"
            name="name"
            value={data.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="phonenumber">Phone</label>
          <input
            type="tel"
            pattern="[0-9]*"
            placeholder="phone"
            name="phone"
            value={data.value}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </>
  );
}

export default AboutYou;
