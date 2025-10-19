module.exports = {
  routes: [
    {
      method: "POST",
      path: "/subscription",
      handler: "subscription.create",
      config: {
        auth: { public: false }, // false = public
      },
    },
  ],
};
