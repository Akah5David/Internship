module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/delete/:id",
      handler: "delete.delete",
      config: {
        auth: { public: false }, // ✅ ensures ctx.state.user is populated
      },
    },
  ],
};
