module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/update/:id",
      handler: "update.update",
      config: {
        auth: { public: false }, // change to true if update requires authentication
      },
    },
  ],
};
