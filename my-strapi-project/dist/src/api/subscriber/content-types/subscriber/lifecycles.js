"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
exports.default = {
    async afterCreate(event) {
        const { result } = event;
        console.log("A new subscriber was created:", result);
        try {
            // Send a welcome email to the new subscriber
            await strapi
                .plugin("email")
                .service("email")
                .send({
                to: result.email,
                from: (0, utils_1.env)("DEFAULT_FROM_EMAIL"), //e.g. single sender verification in SendGrid
                replyTo: (0, utils_1.env)("DEFAULT_REPLY_TO_EMAIL"),
                subject: "The Strapi Email plugin worked successfully",
                text: "Hello world!",
                html: "Hello world!",
            });
            console.log("Welcome email sent to subscriber:", result.email);
        }
        catch (err) {
            console.error("Error in afterCreate lifecycle hook for subscriber:", err);
        }
    },
};
