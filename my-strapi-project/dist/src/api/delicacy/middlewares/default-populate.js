"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config, { strapi }) => {
    return async (ctx, next) => {
        if (!ctx.query.populate) {
            ctx.query.populate = ["createdBy", "updatedBy"];
        }
        await next();
    };
};
