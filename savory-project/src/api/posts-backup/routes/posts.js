module.exports = {
  routes: [
    {
      method: "POST",
      path: "/posts",
      handler: "posts.create", // <--- folder (API) name . controller file name (without .js) . method
      config: { auth: { public: false } },
    },
  ],
};
