import React, { useContext } from "react";
import MyContext from "../../context/MyContext";
function AboutYou({ formik }) {
  const { data, setData } = useContext(MyContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
    formik.setFieldValue(name, value);
  };
  return (
    <>
      <div className="aboutyou">
        <div className="aboutyou-header">
          <h2>About you</h2>
          <p>
            We ask for your details so that we can send you a text with a link
            to your quotes. When you book we'll send a confirmation email and
            pass your name, email address and phone number to the driver you
            choose.
          </p>
        </div>
        <div className="aboutyou-info">
          <div className="aboutyousubdiv">
            <label htmlFor="name">Name</label>
            <input
              // id="name"
              type="text"
              placeholder="name"
              name="name"
              // value={data.name}
              value={formik.values.name}
              onChange={handleInputChange}
              // required
              autoComplete="off"
              // {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-input-booking">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="aboutyousubdiv">
            <label htmlFor="email">Email</label>
            <input
              // id="email"
              type="email"
              placeholder="email"
              name="email"
              // value={data.email}
              value={formik.values.email}
              onChange={handleInputChange}
              // required
              autoComplete="off"
              // {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-input-booking">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="aboutyousubdiv">
            <label htmlFor="phonenumber">Phone</label>
            <input
              // id="tel"
              type="tel"
              pattern="[0-9]*"
              placeholder="phone"
              name="phone"
              // value={data.phone}
              value={formik.values.phone}
              onChange={handleInputChange}
              // required
              autoComplete="off"
              // {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error-input-booking">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutYou;
