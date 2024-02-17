const mailOptions = (
  // result,
  name,
  phone,
  email,
  quoteNumber,
  pickUpaddress,
  deliverAddress,
  // isViaStop,
  pickUpPhysicalAddress,
  deliverPhysicalAddress,
  typeofVan,
  totalHour,
  date,
  outstandingBalance,
  halfanHour,
  totalAmount,
  pickUpaddressStair,
  deliverAddressStair,
  description,
  totalAddress
) => {
  // console.log("this is date from mailoption result" + JSON.stringify(result));
  // console.log("This is date from mailoption" + date);
  // console.log("This is totalHour mailoption" + totalHour);
  const isViaStop = totalAddress.length > 2;
  const viaStopInfo = isViaStop
    ? `<li><strong>Via Stop:</strong> Yes</li>`
    : `<li><strong>Via Stop:</strong> No</li>`;
  // const lengthViaStop = totalAddress.length - 2;
  const viaStopData = isViaStop
    ? totalAddress.slice(1, totalAddress.length - 1).map(
        (item, index) => `<h3>Via Stop ${index + 1}</h3><ul>
  <li><strong>Location:</strong>${item.location}</li>
  ${
    item.physicalAddress
      ? `<li><strong>Physical Address:</strong>${item.physicalAddress}</li>`
      : ""
  }
  <li><strong>Stair:</strong>${item.stair}</li>
  </ul>`
      )
    : ``;
  const myAddress = process.env.MY_URL_FRONT;
  const myQuote = `${myAddress}/retrieve/${quoteNumber}`;
  // const receipt={email,process.env.GMAIL_USERNAME}
  return {
    from: process.env.GMAIL_USERNAME,
    to: [email, process.env.GMAIL_USERNAME],
    subject: "Important Details for Your Upcoming Move",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h1>Dear ${name},</h1>

    <p>Thank you for choosing our service from ${myAddress}.</p>
    <p>We appreciate your trust in us. Here are the essential details for your upcoming move:</p>

    <h2>Contact Information:</h2>
    <ul>
        <li><strong>Your Phone Number:</strong> ${phone}</li>
        <li><strong>Your Email:</strong> ${email}</li>
    </ul>

    <h2>Addresses:</h2>
    <ul>
        <li><strong>Pickup Address:</strong> ${pickUpaddress}</li>
        ${
          pickUpPhysicalAddress
            ? `<li>
              <strong>Pickup Physical Address:</strong> ${pickUpPhysicalAddress}
            </li>`
            : ""
        }
        <li><strong>Pickup Stair:</strong>${pickUpaddressStair}</li>
        <li><strong>Delivery Address:</strong> ${deliverAddress}</li>
        ${
          deliverPhysicalAddress
            ? ` <li>
              <strong>Delivery Physical Address:</strong> ${deliverPhysicalAddress}
            </li>`
            : ""
        }
        
        <li><strong>Delivery Stair:</strong>${deliverAddressStair}</li>
        ${
          isViaStop
            ? `<li><strong>Via Stop Information:</strong> ${viaStopInfo}</li>`
            : ""
        }
        ${viaStopData}
    </ul>

    <h2>Move Details:</h2>
    <ul>
        <li><strong>Van Type:</strong> ${typeofVan}</li>
        <li><strong>Total Hours:</strong> ${totalHour}</li>
        <li><strong>Moving Date:</strong> ${date}</li>
        <li><strong>Total Quotation Price:</strong>£${totalAmount}</li>
        <li><strong>Outstanding Balance:</strong> £${outstandingBalance}</li>
        <li><strong>Additional Charges (if any, per half-hour):</strong> £${halfanHour}</li>
        <li><strong>Description:</strong>${description}</li>
        An additional £15 charge will apply if any of the stops during this booking pass through the Congestion Charge Zone.</li>
    </ul>

    <p>If you have any further inquiries or require additional information, please feel free to reach out. We're here to assist you every step of the way.</p>
    <p>If you want to see your quote details, you can check it on the <a href="${myQuote}">${myAddress}</a> with the quote number: <strong>${quoteNumber}</strong></p>
    <p>We look forward to seeing you on the scheduled moving date. Safe travels!</p>

    <p><strong>Best regards,<br>
    TurboRemovals</strong></p>
  </div>`,
  };
};
module.exports = mailOptions;
