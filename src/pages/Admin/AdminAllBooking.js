// src/components/AdminAllBooking.js

import React, { useEffect, useState } from "react";

import Quotation from "./Quotation/Quotation";
function AdminAllBooking() {
  const [backData, setBackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userClickData, setUserClickData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}backdata/all`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setBackData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Data", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // function handleClick(item){

  // }
  return (
    <div className="alldata">
      {/* <h1>This is User Free Quotation for future Date</h1> */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Quotation backData={backData} setUserClickData={setUserClickData} />

          {/* {userClickData && (
            <div className="userdatashow">
              {userClickData.map((item) => (
                <p>{item.date}</p>
              ))}
            </div>
          )} */}
        </>
      )}
    </div>
  );
}

export default AdminAllBooking;
