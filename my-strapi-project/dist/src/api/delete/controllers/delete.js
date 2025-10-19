"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async delete(ctx) {
        var _a;
        try {
            const { user } = ctx.state;
            const { id } = ctx.params;
            console.log("user", user);
            console.log("id to delete", id);
            if (!user) {
                return ctx.unauthorized("You must be logged in to delete a delicacy");
            }
            if (!id) {
                return ctx.badRequest("ID parameter is required");
            }
            const delicacy = (await strapi.entityService.findOne("api::delicacy.delicacy", id, {
                populate: ["user"],
            }));
            if (!delicacy) {
                return ctx.notFound("Delicacy not found");
            }
            console.log("Delicacy to delete:", delicacy);
            const isOwner = ((_a = delicacy.user) === null || _a === void 0 ? void 0 : _a.documentId) === user.documentId;
            if (!isOwner) {
                return ctx.forbidden("You are not allowed to delete this delicacy");
            }
            await strapi.entityService.delete("api::delicacy.delicacy", id);
            ctx.send({
                message: "Delicacy deleted successfully",
                status: 200,
                data: delicacy,
            });
        }
        catch (err) {
            console.error("Error deleting delicacy:", err);
            ctx.send({
                error: {
                    message: "An error occurred while deleting the delicacy",
                    details: err.message,
                },
                status: 500,
            });
        }
    },
};
