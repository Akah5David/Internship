export default {
  routes: [
    {
      method: "DELETE",
      path: "/delete/:id",
      handler: "delete.delete",
      config: {
        auth: { public: false }, // user must be logged in
      },
    },
  ],
};
