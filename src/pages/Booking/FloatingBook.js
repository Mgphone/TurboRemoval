import React from "react";

function FloatingBook({ userData }) {
  // Ensure userData and userData.quote are available
  const serverQuote = userData && userData.quote;
  // const receivedData = userData && userData.yourinfo.receivedData.addresses;
  console.log(serverQuote);

  // Extract information with null or "Choose" defaults
  const pickupAddress =
    serverQuote && serverQuote.places ? serverQuote.places[0] : "Choose Pickup";

  // const pickupAddressStair =
  //   receivedData[0].stair && receivedData[0].stair
  //     ? receivedData[0].stair
  //     : "No Stair";
  const pickupAddressStair = serverQuote && serverQuote.pickupStair;
  const dropOfAddressStair = serverQuote && serverQuote.deliveryStair;
  const viaStopStair = serverQuote && serverQuote.viaStopStair;
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
        <p>Pickup address: {pickupAddress}</p>
        <p>PickUp stair: {pickupAddressStair}</p>
        <p>Delivery address: {dropOfAddress}</p>
        <p>Delivery Stair: {dropOfAddressStair}</p>
        <p>Via Stop: {viaStop}</p>
        <p>Via Stop Stair: {viaStopStair}</p>
        <p>Type of Worker: {worker}</p>
        <p>Van Size: {vanSize}</p>
        <p>Total Price: {totalPrice}</p>
        <button>Book Now</button>
        <button>Save For Later</button>
      </div>
    </>
  );
}

export default FloatingBook;
