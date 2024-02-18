const reviewMailOptions = (email, name) => {
  return {
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "Please review for us",
    html: `<div id="reviewEmail" style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;">
    <h2 style="margin-bottom: 20px;">Help Us Improve - Your Feedback Matters!</h2>
    <p>
      Dear ${name.toUpperCase()},
    </p>
    <p>
      We hope this email finds you well. At Turbo Removals, we strive to provide the best possible experience to our valued customers, and your feedback is incredibly valuable in helping us achieve that goal.
    </p>
    <p>
      We would greatly appreciate it if you could take a few moments to share your thoughts with us. Your honest feedback helps us understand what we're doing well and where we have opportunities to improve.
    </p>
    <p>
      Would you be willing to leave us a review? Whether it's about your recent experience with our moving services, our customer service team, or anything else related to Turbo Removals, we'd love to hear from you.
    </p>
    <p>
      You can leave a review by clicking on the button below:
    </p>
    <p>
      <a href="https://g.page/r/CV70bXMiecpBEBM/review" style="text-decoration: none;">
        <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Leave a Review</button>
      </a>
    </p>
    <p style="margin-top: 20px;">
      Thank you so much for your time and continued support. If you have any questions or concerns, please don't hesitate to reach out to us.
    </p>
    <p style="margin-top: 20px;">
      Warm regards,<br>
     
      Turbo Removals<br>
      [<a href="www.turboremovals.co.uk" target="_blank">TurboRemovals</a>]
    </p>
  </div>
  `,
  };
};

module.exports = reviewMailOptions;
