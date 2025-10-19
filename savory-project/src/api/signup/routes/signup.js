module.exports = {
  routes: [
    {
      method: "POST",
      path: "/register",
      handler: "signup.register",
      config: {
        auth: false, // false = public
      },
    },
  ],
};
