"use strict";

/**
 * delicacy router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::delicacy.delicacy", {
  config: {
    find: {
      middlewares: ["api::delicacy.default-populate"],
    },
    findOne: {
      middlewares: ["api::delicacy.default-populate"],
    },
  },
});
