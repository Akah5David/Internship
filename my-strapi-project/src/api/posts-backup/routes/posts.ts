export default {
  routes: [
    {
      method: "POST",
      path: "/posts",
      handler: "posts.create",
      config: {
        auth: { public: false }, // user must be logged in
      },
    },
  ],
};
