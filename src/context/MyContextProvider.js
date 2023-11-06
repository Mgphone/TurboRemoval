import React, { createContext, useState, useContext } from "react";
import MyContext from "./MyContext.js";
function MyContextProvider({ children }) {
  // const sharedData = "This is the data i will share";
  const [sharedData, setShareData] = useState("");
  return (
    <MyContext.Provider value={{ sharedData, setShareData }}>
      {children}
    </MyContext.Provider>
  );
}
export default MyContextProvider;
