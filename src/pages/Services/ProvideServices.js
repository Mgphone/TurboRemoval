import React from "react";
import servicesprovided from "../../data/servicesprovided";
function ProvideServices() {
  return (
    <>
      <div className="home-services">
        <div className="home-services-top">
          <h1>Services Provide</h1>
          <p>"Safe and Convenient Services Your Belongings, Our Care"</p>
        </div>
        <div className="services-cards">
          {servicesprovided.map((item) => (
            <div key={item.No} className="service-card ">
              <img
                src={require(`../../assets${item.Image}`)}
                alt={item.Title}
              />
              <h4>{item.Title}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProvideServices;
