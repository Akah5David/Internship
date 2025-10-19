export default {
  async create(ctx) {
    try {
      const body = ctx.request.body;
      const { user } = ctx.state;

      let data;

      if (body.data) {
        if (typeof body.data === "string") {
          try {
            data = JSON.parse(body.data);
          } catch (err) {
            return ctx.badRequest("Invalid JSON in 'data' field");
          }
        } else {
          data = body.data; // already an object
        }
      } else {
        data = body;
      }

      console.log("Request data:", data);
      if (!data.email) {
        return ctx.badRequest("Email is required");
      }

      let subscription;

      if (user) {
        subscription = await strapi.entityService.create(
          "api::subscriber.subscriber",
          {
            data: { email: data.email },
          }
        );
      } else {
        subscription = await strapi.entityService.create(
          "api::subscriber.subscriber",
          {
            data: { email: data.email },
          }
        );
      }

      console.log("Created subscription:", subscription);

      ctx.send({
        message: "Subscribed successfully",
        status: 200,
        data: subscription,
      });
    } catch (err) {
      console.error("Error creating subscription:", err);
      ctx.send({
        error: {
          message: "An error occurred while Subscribing",
          details: err.message,
        },
        status: 500,
      });
    }
  },
};
