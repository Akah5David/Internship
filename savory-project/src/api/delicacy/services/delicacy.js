'use strict';

/**
 * delicacy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::delicacy.delicacy');
