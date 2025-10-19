module.exports = {
  routes: [
    {
      method: "POST",
      path: "/login",
      handler: "login.login",
      config: {
        auth: { public: true }, // allow public access (or set to true if needed)
      },
    },
  ],
};
