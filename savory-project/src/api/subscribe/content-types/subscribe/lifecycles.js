module.exports = {
  async afterCreate(event) {
    const { result } = event; // result contains the newly created entry
    const email = result.email;

    if (!email) {
      console.log("No email found for subscription entry.");
      return;
    }

    try {
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: email,
          from: "SavoryBlog@protonmail.com", // must be verified in SendGrid / SMTP provider
          replyTo: "myemail@protonmail.com",
          subject: "Thanks for subscribing!",
          text: `Hi, you subscribed successfully with ${email}`,
          html: `<div>
                 <h1>Welcome!</h1>
                 <p>You successfully subscribed to our newsletter with <b>${email}</b>.</p>
               </div>`,
        });

      console.log(`Confirmation email sent to ${email}`);
    } catch (err) {
      console.error("Email sending failed:", err);
    }
  },
};
