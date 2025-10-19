module.exports = {
  async delete(ctx) {
    try {
      const { id } = ctx.params;
      strapi.log.info("delete", id);
      console.log("delete", id);

      if (!id) return ctx.badRequest("Missing id param");

      // optional auth/permission checks
      const user = ctx.state.user;
      console.log("user", user);
      if (!user) return ctx.unauthorized();

      // find existing to know related file ids to remove if you want
      const existing = await strapi.entityService.findOne(
        "api::delicacy.delicacy",
        id,
        { populate: ["image"] }
      );
      if (!existing) return ctx.notFound("Entry not found");

      // delete the entry
      const entity = await strapi.entityService.delete(
        "api::delicacy.delicacy",
        id
      );

      //   optionally remove media from upload plugin if you want:
      if (existing.image && existing.image.id) {
        try {
          await strapi
            .plugin("upload")
            .service("file")
            .remove(existing.image.id);
        } catch (e) {
          // log and continue
          strapi.log.warn(
            `Failed to remove image for deleted delicacy ${id}: ${e.message}`
          );
        }
      }

      return ctx.send(entity);
    } catch (err) {
      strapi.log.error(err);
      return ctx.internalServerError("Failed to delete delicacy");
    }
  },
};
