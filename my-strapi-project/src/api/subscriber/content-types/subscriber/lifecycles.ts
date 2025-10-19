import { env } from "@strapi/utils";

export default {
  async afterCreate(event) {
    const { result } = event;

    console.log("A new subscriber was created:", result);

    try {
      // Send a welcome email to the new subscriber
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: result.email,
          from: env("DEFAULT_FROM_EMAIL"), //e.g. single sender verification in SendGrid
          replyTo: env("DEFAULT_REPLY_TO_EMAIL"),
          subject: "The Strapi Email plugin worked successfully",
          text: "Hello world!",
          html: "Hello world!",
        });

      console.log("Welcome email sent to subscriber:", result.email);
    } catch (err) {
      console.error("Error in afterCreate lifecycle hook for subscriber:", err);
    }
  },
};
