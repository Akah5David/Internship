export default {
  routes: [
    {
      method: "POST",
      path: "/login",
      handler: "signin-user.login",
      config: {
        auth: {public: true}, // allow public access (or set to true if needed)
      },
    },
  ],
};
