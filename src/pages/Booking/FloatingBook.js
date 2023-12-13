import React from "react";

function FloatingBook({ userData }) {
  // Ensure userData and userData.quote are available
  const serverQuote = userData && userData.quote;
  // const receivedData = userData && userData.yourinfo.receivedData.addresses;
  console.log(serverQuote);

  // Extract information with null or "Choose" defaults
  const pickupAddress =
    serverQuote && serverQuote.places ? serverQuote.places[0] : "Choose Pickup";
  const pickupAddressStair =
    serverQuote && serverQuote.pickupStair
      ? serverQuote.pickupStair
      : "No Stair";

  const dropOfAddressStair =
    serverQuote && serverQuote.deliveryStair
      ? serverQuote.deliveryStair
      : "No Stair";

  const viaStopStair =
    serverQuote && serverQuote.viaStopStair
      ? serverQuote.viaStopStair
      : "No Stair";
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

  // const totalStair = serverQuote && serverQuote.stairTotal;
  // const viaStopStair = totalStair - (pickupAddressStair + dropOfAddressStair);
  const vanSize = serverQuote && serverQuote.typeofVan;
  const worker = serverQuote && serverQuote.typeOfWorker;
  const totalPrice = serverQuote && serverQuote.totalPrice.toFixed(2);
  return (
    <>
      <div className="floatingbook">
        <h1>Booking Summary</h1>
        {pickupAddress && <p>Pickup address:{pickupAddress} </p>}
        {pickupAddressStair && <p>PickUp stair: {pickupAddressStair}</p>}
        {viaStop && <p>Via Stop: {viaStop} </p>}
        {viaStopStair && <p>Via Stop Stair:{viaStopStair} </p>}
        {dropOfAddress && <p>Delivery address: {dropOfAddress}</p>}
        {dropOfAddressStair && <p>Delivery Stair:{dropOfAddressStair} </p>}
        {worker && <p>Type of Worker: {worker}</p>}
        {vanSize && <p>Van Size: {vanSize}</p>}
        {totalPrice && <p>Total Price: {totalPrice}</p>}
        <button>Book Now</button>
        <button>Save For Later</button>
      </div>
    </>
  );
}

export default FloatingBook;
