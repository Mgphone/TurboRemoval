import React from "react";
import servicesprovided from "../../data/servicesprovided";
import { Link } from "react-router-dom";

function ProvideServices() {
  const replaceCharacters = (str) => {
    return str.replace(/ /g, "-");
  };

  return (
    <>
      <div className="home-services">
        <div className="home-services-top">
          <h1>Services Provide</h1>
          <p>"Safe and Convenient Services Your Belongings, Our Care"</p>
        </div>
        <div className="services-cards">
          {servicesprovided.map((item) => (
            <Link
              key={item.No}
              className="service-card "
              to={`/services/${replaceCharacters(item.Title)}`}
            >
              <img
                src={require(`../../assets${item.Image}`)}
                loading="lazy"
                alt={item.Title}
              />
              <h4>{item.Title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProvideServices;
