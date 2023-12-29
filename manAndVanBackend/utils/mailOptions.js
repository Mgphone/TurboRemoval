const mailOptions = (
  name,
  phone,
  email,
  quoteNumber,
  pickUpaddress,
  deliverAddress,
  isViaStop
) => {
  const viaStopInfo = isViaStop
    ? `<li><strong>Via Stop:</strong> Yes</li>`
    : `<li><strong>Via Stop:</strong> No</li>`;
  return {
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "Important Details for Your Upcoming Move",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1>Dear ${name},</h1>
  
      <p>Thank you for choosing our service from www.lifitinglondon.com.</p>
       <p>We appreciate your trust in us. Here are the essential details for your upcoming move:</p>
  
      <h2>Contact Information:</h2>
      <ul>
          <li><strong>Your Phone Number:</strong> ${phone}</li>
      </ul>
  
      <h2>Addresses:</h2>
      <ul>
          <li><strong>Pickup Address:</strong> ${pickUpaddress}</li>
          <li><strong>Delivery Address:</strong> ${deliverAddress}</li>
          ${viaStopInfo}
      </ul>
  
      <h2>Driver Details:</h2>
      <ul>
          <li><strong>Your Assigned Driver's Information:</strong> {driver details}</li>
      </ul>
  
      <p>If you have any further inquiries or require additional information, please feel free to reach out. We're here to assist you every step of the way.</p>
      <p>If you want to see your quote details, you can check it on the website with the quote number: <strong>${quoteNumber}</strong></p>
      <p>We look forward to seeing you on the scheduled moving date. Safe travels!</p>
  
      <p><strong>Best regards,<br>
     Lifiting London</strong></p>
    </div>`,
  };
};
module.exports = mailOptions;
