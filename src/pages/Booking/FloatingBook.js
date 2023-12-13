import React from "react";

function FloatingBook({ userData }) {
  // Ensure userData and userData.quote are available
  const serverQuote = userData && userData.quote;
  const receivedData = userData && userData.yourinfo.receivedData.addresses;
  console.log(serverQuote);

  // Extract information with null or "Choose" defaults
  const pickupAddress =
    serverQuote && serverQuote.places ? serverQuote.places[0] : "Choose Pickup";

  // const pickupAddressStair =
  //   receivedData[0].stair && receivedData[0].stair
  //     ? receivedData[0].stair
  //     : "No Stair";

  const dropOfAddress =
    serverQuote && serverQuote.places
      ? serverQuote.places[serverQuote.places.length - 1]
      : "Choose Drop Off";

  // const dropOfAddressStair =
  //   receivedData[receivedData.length - 1].stair &&
  //   receivedData[receivedData.length - 1].stair
  //     ? receivedData[receivedData.length - 1].stair
  //     : "No Stair";

  const viaStop =
    serverQuote && serverQuote.places && serverQuote.places.length > 2
      ? serverQuote.places.length - 2
      : "No Via Stop";

  const totalStair = serverQuote && serverQuote.stairTotal;
  // const viaStopStair = totalStair - (pickupAddressStair + dropOfAddressStair);
  const vanSize = serverQuote && serverQuote.typeofVan;
  const worker = serverQuote && serverQuote.typeOfWorker;
  const totalPrice = serverQuote && serverQuote.totalPrice.toFixed(2);
  return (
    <>
      <div className="floatingbook">
        <h1>Booking Summary</h1>
        <div>Pickup address: {pickupAddress}</div>
        {/* <div>PickUp stair: {pickupAddressStair}</div> */}
        <div>Delivery address: {dropOfAddress}</div>
        {/* <div>Delivery Stair:{dropOfAddressStair}</div> */}
        <div>Via Stop: {viaStop}</div>
        {/* <div>Via Stop Stair:{viaStopStair}</div> */}
        <div>typeOfWorker:{worker}</div>
        <div>vanSize:{vanSize}</div>
        <div>{totalPrice}</div>
      </div>
    </>
  );
}

export default FloatingBook;
