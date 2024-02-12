import React, { useContext, useEffect } from "react";
import MyContext from "../../../context/MyContext";
import { v4 as uuidv4 } from "uuid";
import Between from "./Between";
function BetweenMoving() {
  const { data, setData } = useContext(MyContext);

  const handleInputChange = (value, betweenId) => {
    console.log("Between ID:", betweenId);

    const updatedAddresses = data.addresses.map((address) =>
      address.id === betweenId ? { ...address, location: value } : address
    );
    // console.log("Updated Addresses:", updatedAddresses);

    setData((prevValue) => ({
      ...prevValue,
      addresses: [...updatedAddresses],
    }));
  };
  // const handleInputChange = (value, betweenId) => {
  //   console.log(betweenId);
  // };
  const handleInputAddressChange = (value, betweenId) => {
    // console.log("Between ID:", betweenId);
    const updatedAddresses = data.addresses.map((address) =>
      address.id === betweenId
        ? { ...address, physicalAddress: value }
        : address
    );
    setData((prevValue) => ({ ...prevValue, addresses: updatedAddresses }));
  };

  const handleStairChange = (value, betweenId) => {
    const updatedAddresses = data.addresses.map((address) =>
      address.id === betweenId ? { ...address, stair: value } : address
    );
    setData((prevValue) => ({
      ...prevValue,
      addresses: [...updatedAddresses],
    }));
  };

  const addBetween = () => {
    const uniqueId = uuidv4();
    setData((prevValue) => ({
      ...prevValue,
      addresses: [
        ...prevValue.addresses.slice(0, prevValue.addresses.length - 1),
        {
          id: uniqueId,
          location: "London NW2, UK",
          physicalAddress: "",
          stair: "",
        },
        ...prevValue.addresses.slice(-1),
      ],
    }));
  };

  const removeBetween = (removeId) => {
    const removeIndex = data.addresses.findIndex(
      (address) => address.id === removeId
    );

    if (removeIndex !== -1) {
      const updatedAddresses = [
        ...data.addresses.slice(0, removeIndex),
        ...data.addresses.slice(removeIndex + 1),
      ];
      setData((prevValue) => ({
        ...prevValue,
        addresses: [...updatedAddresses],
      }));
    }
  };
  return (
    <>
      {data.addresses
        .slice(1, -1)
        .map(({ id, inputValue, inputAddress, stair }, index) => (
          <div key={id} className={`viastop${index} viacontainer viastopinput`}>
            <Between
              inputValue={inputValue}
              handleInputChange={(value) => handleInputChange(value, id)}
              inputAddress={inputAddress}
              handleInputAddressChange={(value) =>
                handleInputAddressChange(value, id)
              }
              stair={stair}
              handleStairChange={(value) => handleStairChange(value, id)}
            />
            <p className="remove-via" onClick={() => removeBetween(id)}>
              Remove Stop
            </p>
          </div>
        ))}

      <button onClick={addBetween}>Add Stop</button>
    </>
  );
}

export default BetweenMoving;
