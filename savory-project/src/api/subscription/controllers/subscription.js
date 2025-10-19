module.exports = {
  async create(ctx) {
    const email = ctx.request.body.data?.email;
    const user = ctx.state.user;

    if (!email) {
      return ctx.badRequest("Email is required");
    }

    let subscription;

    if (user) {
      subscription = await strapi.entityService.create(
        "api::subscribe.subscribe",
        {
          data: { email: email },
        }
      );
    } else {
      subscription = await strapi.entityService.create(
        "api::subscribe.subscribe",
        {
          data: { email: email },
        }
      );
    }

    if (!subscription) {
      return ctx.badRequest("Error creating an entry for subscription email.");
    }

    console.log("Subscribed email", subscription);



    return subscription;
  },
};
