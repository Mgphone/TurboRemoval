import React, { createContext, useState, useContext } from "react";
import MyContext from "./MyContext.js";
function MyContextProvider({ children }) {
  const initialData = {
    addresses: [],
    completeAddress: [],
    typeOfVan: "",
    numberOfWorker: "",
    staff: "",
    date: "",
    description: "",
    email: "",
    phone: "",
  };
  const [data, setData] = useState(initialData);
  const addAddress = (newAddress) => {
    // const updateAddresses = [data.addresses, newAddress];
    setData((prevState) => ({
      ...prevState,
      addresses: [...prevState.addresses, newAddress],
    }));
  };

  return (
    <MyContext.Provider
      value={{
        data,
        addAddress,
        setData,
        initialData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
export default MyContextProvider;
