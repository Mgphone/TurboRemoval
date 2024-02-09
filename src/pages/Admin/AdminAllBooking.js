// src/components/AdminAllBooking.js

import React, { useEffect, useState } from "react";

function AdminAllBooking() {
  const [backData, setBackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}backdata/all`;
        const response = await fetch(url);
        // console.log("THIS IS URL " + url);
        // console.log("This is response" + JSON.stringify(response));
        // console.log("This is response backeend" + JSON.stringify(response));
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

  return (
    <div className="alldata">
      <h1>This is coming from All Data</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {backData.map((item) => (
            <li key={item._id}>{item.date}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminAllBooking;
